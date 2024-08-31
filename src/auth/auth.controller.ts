import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Successfully login.' })
  @ApiBody({ type: CreateAuthDto })
  @UseGuards(LocalAuthGuard)
  handleLogin(@Request() req, @Body() loginDto: CreateAuthDto) {
    return this.authService.login(req.user)
  }
 
//profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth() 
  @ApiOperation({ summary: 'Profile' })
  @ApiResponse({ status: 200, description: 'Successfully profile.' })
  getProfile(@Request() req) {
    return req.user;
  }
}
