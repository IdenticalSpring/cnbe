import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../models/users/users.service';
import { comparePasswordHelper } from 'src/helper/utils';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ChangePasswordAuthDto, codeAuthDto } from './dto/code-auth.dto';

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

  async validateOAuthLoginGithub(profile: any): Promise<any> {
    const { username, emails, name } = profile;

    // Kiểm tra email từ GitHub profile
    const email = emails && emails.length > 0 ? emails[0].value : null;
    if (!email) {
      throw new Error("GitHub profile does not contain an email");
    }

    const existingUserByEmail = await this.usersService.findByEmail(email);
    if (existingUserByEmail) {

      const payload = { username: existingUserByEmail.username, sub: existingUserByEmail.id };
      return {
        access_token: this.jwtService.sign(payload),
        user: existingUserByEmail,
      };
    }
    const newUser = await this.usersService.create({
      name,
      username,
      email,
      password: null,
      isActive: true,
    });

    const payload = { username: newUser.username, sub: newUser.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: newUser,
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
}
