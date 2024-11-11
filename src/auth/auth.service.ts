import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../models/users/users.service';
import { comparePasswordHelper } from 'src/helper/utils';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ChangePasswordAuthDto, codeAuthDto } from './dto/code-auth.dto';
import { User } from 'src/models/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      return null;
    }
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) {
      return null;
    }
    return user;
  }

  async validateOAuthLoginGithub(profile: { username: string; email: string; name: string }): Promise<User> {
    const { username, email, name } = profile;

    // Kiểm tra xem người dùng đã tồn tại chưa dựa trên email
    let user = await this.usersService.findByEmail(email);
    if (!user) {
      // Nếu người dùng không tồn tại, tạo mới
      user = await this.usersService.create({
        username,
        email,
        name,
        password: null,
        isActive: true,
      });
    }

    return user;
  }

  async createJwtToken(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }


  async validateGoogleUser(googleProfile: any) {
    const { email, firstName, lastName } = googleProfile;

    if (!email) {
      throw new BadRequestException('Email is required for Google authentication');
    }

    try {
      // Try to find existing user
      const existingUser = await this.usersService.findByEmail(email);

      if (existingUser) {
        return existingUser;
      }

      // Create new user if doesn't exist
      const username = email.split('@')[0];
      const newUser = await this.usersService.create({
        username,
        email,
        name: `${firstName} ${lastName}`.trim(),
        isActive: true,
        password: null,
      });

      return newUser;
    } catch (error) {
      console.error('Error in validateGoogleUser:', error);
      throw new BadRequestException('Failed to validate Google user');
    }
  }

  



  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(token: string) {
    return { message: 'Logged out successfully' };
  }
  handleRegister = async (registerDto: CreateAuthDto) => {
    return await this.usersService.handleRegister(registerDto);
  };
  checkCode = async (data: codeAuthDto) => {
    return await this.usersService.handleActive(data);
  };
  retryActive = async (data: string) => {
    return await this.usersService.retryActive(data);
  };
  retryPassword = async (data: string) => {
    return await this.usersService.retryPassword(data);
  };
  changePassword = async (data: ChangePasswordAuthDto) => {
    return await this.usersService.changePassword(data);
  };
  async findUserByUsername(username: string) {
    return this.usersService.findByUsername(username); 
  }
}
