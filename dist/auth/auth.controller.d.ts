import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ChangePasswordAuthDto, codeAuthDto, RetryActiveDto } from './dto/code-auth.dto';
export declare class AuthController {
    private readonly authService;
    private readonly mailerService;
    constructor(authService: AuthService, mailerService: MailerService);
    login(req: any, res: any): Promise<{
        message: string;
    }>;
    logout(req: any, res: any): Promise<{
        message: string;
    }>;
    getProfile(req: any): any;
    register(registerDto: CreateAuthDto): Promise<{
        success: boolean;
        message: string;
        id: number;
    }>;
    checkCode(codeDto: codeAuthDto): Promise<{
        success: boolean;
        message: string;
    }>;
    retryActive(retryActiveDto: RetryActiveDto): Promise<{
        success: boolean;
        message: string;
        id: number;
    }>;
    retryPassword(email: string): Promise<{
        success: boolean;
        message: string;
        id: number;
        email: string;
    }>;
    changePassword(data: ChangePasswordAuthDto): Promise<{
        success: boolean;
        message: string;
    }>;

    githubLogin(): Promise<void>;
    githubLoginCallback(req: any, res: any): Promise<{
        message: string;
        access_token: string;

    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any, res: any): Promise<{
        message: string;

    }>;
}
