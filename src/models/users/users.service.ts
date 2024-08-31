import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { hashPasswordHelper } from 'src/helper/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
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
}
