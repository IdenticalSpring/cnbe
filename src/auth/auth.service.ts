import { Injectable } from '@nestjs/common';
import { UsersService } from '../models/users/users.service';
import { comparePasswordHelper } from 'src/helper/utils';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ChangePasswordAuthDto, codeAuthDto } from './dto/code-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

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
    const { id, username, emails,name } = profile;

    
    let user = await this.usersService.findByUsername(username);

    if (!user) {
    
      user = await this.usersService.create({
        name, 
        username,
        email: emails[0].value,
        password: null,
      });
    }

    return user;
  }



  async validateGoogleUser(profile: any): Promise<any> {
    let user = await this.usersService.findByEmail(profile.email);
    if (!user) {
      user = await this.usersService.create({
        username: profile.email.split('@')[0],
        email: profile.email,
        name: `${profile.firstName} ${profile.lastName}`,
        isActive: true,
        password: null,  
      });
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async logout(token: string) {
    return { message: 'Logged out successfully' };
  }
  handleRegister = async (registerDto: CreateAuthDto) => {
    return await this.usersService.handleRegister(registerDto);
  }
  checkCode = async (data: codeAuthDto) => {
    return await this.usersService.handleActive(data)
  }
  retryActive = async (data: string) => {
    return await this.usersService.retryActive(data)
  }
  retryPassword = async (data: string) => {
    return await this.usersService.retryPassword(data)
  }
  changePassword = async (data: ChangePasswordAuthDto) => {
    return await this.usersService.changePassword(data)
  }

}