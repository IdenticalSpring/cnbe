import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
@Post("login")
@ApiOperation({ summary: 'Login' })
@ApiResponse({ status: 200, description: 'Successfully login.' })
create(@Body() createAuthDto:CreateAuthDto){
  return this.authService.signIn(createAuthDto.username,createAuthDto.password)
}
 
}
