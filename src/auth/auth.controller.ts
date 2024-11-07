import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Response,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiBearerAuth, ApiBody, ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public, ResponseMassage } from 'src/decorator/public.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import {
  ChangePasswordAuthDto,
  codeAuthDto,
  RetryActiveDto,
} from './dto/code-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/admin.decorator';
import { RolesGuard } from './passport/roles.guard';

@ApiTags('auth')
@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
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
    res.cookie('jwt', access_token, {
      httpOnly: false,  
      secure: process.env.NODE_ENV !== 'development',  
      sameSite: 'none',  
    });

    return { message: 'Logged in successfully', access_token };
  }



  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Request() req, @Response({ passthrough: true }) res) {
    res.clearCookie('jwt');  
    return { message: 'Logged out successfully' };
  }

  @Roles('admin')
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

  @Post('check-code')
  @Public()
  async checkCode(@Body() codeDto: codeAuthDto) {
    return await this.authService.checkCode(codeDto);
  }

  @Post('retry-active')
  @Public()
  retryActive(@Body() retryActiveDto: RetryActiveDto) {
    return this.authService.retryActive(retryActiveDto.email);
  }

  @Post('retry-password')
  @Public()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'user@example.com',
          description: 'The email address of the account to reset the password',
        },
      },
      required: ['email'],
    },
  })
  retryPassword(@Body('email') email: string) {
    return this.authService.retryPassword(email);
  }
  @Post('change-password')
  @Public()
  changePassword(@Body() data: ChangePasswordAuthDto) {
    return this.authService.changePassword(data);
  }

  @Get('github')
  @Public()
  @UseGuards(AuthGuard('github'))
  async githubLogin() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @Public()
  @ApiExcludeEndpoint()
  async githubLoginCallback(@Req() req, @Res() res) {
    try {
      // Validate or create the user using GitHub data
      const user = await this.authService.validateOAuthLoginGithub(req.user);

      // Generate login credentials (access token)
      const loginResult = await this.authService.login(user);

      // Define FE redirect URL (change this to your actual FE URL)
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

      // Redirect user to FE with access token in query params
      return res.redirect(
        `${frontendUrl}/auth/callback?access_token=${loginResult.access_token}`
      );

    } catch (error) {
      console.error('GitHub Auth Error:', error);
      throw error;
    }
  }

  @Get('google')
  @Public()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('google/callback')
  @Public()
  @UseGuards(AuthGuard('google'))
  @ApiExcludeEndpoint()
  async googleAuthRedirect(@Req() req, @Res() res) {
    try {
      // Validate or create the user using Google data
      const user = await this.authService.validateGoogleUser(req.user);

      // Generate login credentials (access token)
      const loginResult = await this.authService.login(user);

      // Define FE redirect URL (change this to your actual FE URL)
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

      // Redirect user to FE with access token in query params
      return res.redirect(
        `${frontendUrl}/auth/callback?access_token=${loginResult.access_token}`
      );

    } catch (error) {
      console.error('Google Auth Error:', error);
      throw error;
    }
  }

}
