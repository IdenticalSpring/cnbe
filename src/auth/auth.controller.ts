import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
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

  @Post("login")
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Successfully login.' })
  @ApiBody({ type: LoginAuthDto })
  @UseGuards(LocalAuthGuard)
  @Public()
  @ResponseMassage('Fetch Login')
  handleLogin(@Request() req, @Body() loginDto: LoginAuthDto) {
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
//Register
@Post('register')
@ApiOperation({ summary: 'Register' })
@ApiResponse({ status: 200, description: 'Successfully register.' })
@Public()
register(@Body() registerDto:CreateAuthDto){
  return this.authService.handleRegister(registerDto);
}
//test email
  @Get('mail')
  @Public()
  @ApiOperation({ summary: 'Test email sending' })
  @ApiResponse({ status: 200, description: 'Email sent successfully.' })
  @ApiResponse({ status: 500, description: 'Failed to send email.' })
  async testMail() {
    try {
      await this.mailerService.sendMail({
        to: 'qpham7286@gmail.com',
        subject: 'Testing Nest MailerModule ✔',
        template: 'register',
        context: {
          name: "Eric",
          activationCode: 123456789
        }
      });
      return { message: "Email sent successfully" };
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new HttpException('Failed to send email', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
