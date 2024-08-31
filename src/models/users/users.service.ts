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
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Hash the password before creating the user
      const hashedPassword = await hashPasswordHelper(createUserDto.password);

      // Create a new object with the hashed password
      const userWithHashedPassword = {
        ...createUserDto,
        password: hashedPassword,
      };

      // Create and return the new user
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
  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ where: { email } });
  }
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async handleRegister(registerDto: CreateAuthDto) {
    const { name, email, password } = registerDto;
    const isExist = await this.isEmailExist(email);
    if (isExist === true) {
      throw new BadRequestException(`Email đã tồn tại:${email}. Vui lòng dùng email khác`)
    }
    const hashPassword = await hashPasswordHelper(password)
    const codeId = uuidv4();
    const user = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      isActive: false,
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes').toDate()
    })

    try {
      await this.mailerService.sendMail({
        to: email,  
        subject: `Activate your account`,
        template: "template",
        context: {
          name: name ?? email,
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
  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ where: { email } });
    return !!user; // Trả về true nếu user tồn tại, ngược lại là false
  }

}
