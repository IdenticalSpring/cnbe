import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../models/users/users.service';
import { comparePasswordHelper } from 'src/helper/utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    private usersService: UsersService,
    private jwtService:JwtService
  ) { }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!user||!isValidPassword) return null;

    return user;
    // const payload = { sub: user.id, username: user.email };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
}