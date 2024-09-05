import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { hashPasswordHelper } from 'src/helper/utils';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';

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
    const { name, username, password,email } = registerDto;
    const isExist = await this.isUsernameExist(username);
    if (isExist === true) {
      throw new BadRequestException(`Username already exists: ${username}. Please use a different username.`);
    }
    const hashPassword = await hashPasswordHelper(password)
    const codeId = uuidv4();
    const user = await this.userModel.create({
      name,
      username,
      email,
      password: hashPassword,
      isActive: false,
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes').toDate()
    })

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: `Activate your account`,
        template: "template",
        context: {
          name: name ?? username,
          activationCode: codeId
        }
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }

    return {
      _id: user.id
    }
  }

  async isUsernameExist(username: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { username } });
    return !!user;
  }
}