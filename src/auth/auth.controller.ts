import { Controller, Get, Post, Body, UseGuards, Request, Response, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public, ResponseMassage } from 'src/decorator/public.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly mailerService: MailerService
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({ status: 200, description: 'Login successful.' })
  @ApiBody({ type: LoginAuthDto })
  @UseGuards(LocalAuthGuard)
  @Public()
  @ResponseMassage('User logged in successfully')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    const { access_token } = await this.authService.login(req.user);
    res.cookie('jwt', access_token, { httpOnly: true, secure: process.env.NODE_ENV !== 'development' });
    return { message: 'Logged in successfully' };
  }
  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Request() req, @Response({ passthrough: true }) res) {
    const token = req.cookies['jwt'];
    const result = await this.authService.logout(token);
    res.clearCookie('jwt');
    return result;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy thông tin Profile' })
  @ApiResponse({ status: 200, description: 'Lấy profile thành công.' })
  getProfile(@Request() req) {
        return req.user;
  }


  @Post('register')
  @ApiOperation({ summary: 'User Registration' })
  @ApiResponse({ status: 200, description: 'Registration successful.' })
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }

}
