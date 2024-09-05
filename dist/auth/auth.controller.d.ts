import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
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
        _id: number;
    }>;
}
