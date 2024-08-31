import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../models/users/users.service';
import { comparePasswordHelper } from 'src/helper/utils';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  
  constructor(
    private usersService: UsersService,
    private jwtService:JwtService
  ) { }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!user||!isValidPassword) {
      return null;
    }
    return user;
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      user:{
        email:user.email,
        id:user.id,
        name:user.name
      },
      access_token: this.jwtService.sign(payload),
    };
  }
 handleRegister= async(registerDto: CreateAuthDto)=>{
   return await this.usersService.handleRegister(registerDto);
 }
}