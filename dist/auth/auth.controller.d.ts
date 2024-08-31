import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AuthController {
    private readonly authService;
    private readonly mailerService;
    constructor(authService: AuthService, mailerService: MailerService);
    handleLogin(req: any, loginDto: LoginAuthDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    register(registerDto: CreateAuthDto): Promise<{
        _id: number;
    }>;
    testMail(): Promise<{
        message: string;
    }>;
}
