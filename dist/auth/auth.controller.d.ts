import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    handleLogin(req: any, loginDto: CreateAuthDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
}
