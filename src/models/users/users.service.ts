import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { hashPasswordHelper } from 'src/helper/utils';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';
import { ChangePasswordAuthDto, codeAuthDto } from 'src/auth/dto/code-auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private readonly mailerService: MailerService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await hashPasswordHelper(createUserDto.password);

      const userWithHashedPassword = {
        ...createUserDto,
        password: hashedPassword,
      };

      return await this.userModel.create(userWithHashedPassword as User);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userModel.findOne({ where: { username } });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async handleRegister(registerDto: CreateAuthDto) {
    const { name, username, password, email } = registerDto;
    const isExist = await this.isUsernameExist(username);
    if (isExist === true) {
      throw new BadRequestException(`Username already exists: ${username}. Please use a different username.`);
    }

    const hashPassword = await hashPasswordHelper(password);
    const codeId = uuidv4();
    const user = await this.userModel.create({
      name,
      username,
      email,
      password: hashPassword,
      isActive: false,
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes').toDate(),
    });

    await this.sendActivationEmail(user, name ?? username, codeId);

    return { success: true, message: "User registered successfully", id: user.id };
  }

  private async sendActivationEmail(user: User, name: string, activationCode: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: `Activate your account`,
        template: 'template',
        context: {
          name,
          activationCode,
        },
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send activation email');
    }
  }

  async isUsernameExist(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { username } });
    return !!user;
  }

  async handleActive(data: codeAuthDto) {
    const user = await this.userModel.findOne({
      where: {
        id: data.id,
        codeId: data.codeId,
        isActive: false,
      },
    });

    if (!user) {
      throw new BadRequestException("Invalid activation code or the code has expired.");
    }

    const isBeforeCheck = dayjs().isBefore(user.codeExpired);

    if (isBeforeCheck) {
      await this.userModel.update(
        { isActive: true, codeId: null, codeExpired: null },
        { where: { id: data.id } }
      );
    } else {
      throw new BadRequestException("Invalid activation code or the code has expired.");
    }

    return { success: true, message: "Account activated successfully" };
  }

  async retryActive(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException("Account does not exist");
    }
    if (user.isActive) {
      throw new BadRequestException("Account is already activated");
    }
    const newCodeId = uuidv4();
    const newCodeExpiration = dayjs().add(5, "minutes").toDate();
    await user.update({
      codeId: newCodeId,
      codeExpired: newCodeExpiration,
    });
    await this.sendActivationEmail(user, user.name ?? user.email, newCodeId);
    return { success: true, message: "New activation code sent successfully", id: user.id };
  }
  async retryPassword(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException("Account does not exist");
    }
    const codeId = uuidv4();
    const codeExpired = dayjs().add(5, "minutes").toDate();

    await user.update({
      codeId: codeId,
      codeExpired: codeExpired
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: `Change password`,
      template: "password-reset",
      context: {
        name: user.name ?? user.email,
        activationCode: codeId
      }
    });

    return { success: true, message: "Password reset code sent successfully", id: user.id, email: user.email };
  }

  async changePassword(data: ChangePasswordAuthDto) {
    if (data.confirmPassword !== data.password) {
      throw new BadRequestException("Passwords do not match");
    }

    const user = await this.userModel.findOne({
      where: {
        email: data.email,
        codeId: data.code,
        isActive: true
      }
    });

    if (!user) {
      throw new BadRequestException("Account does not exist or the code is invalid");
    }

    const isBeforeExpiration = dayjs().isBefore(user.codeExpired);
    if (!isBeforeExpiration) {
      throw new BadRequestException("The code has expired");
    }

    const newPassword = await hashPasswordHelper(data.password);
    await user.update({
      password: newPassword,
      codeId: null,
      codeExpired: null
    });

    return { success: true, message: "Password changed successfully" };
  }
}