import { UsersService } from '../models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ChangePasswordAuthDto, codeAuthDto } from './dto/code-auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;

    validateOAuthLoginGithub(profile: any): Promise<any>;

    validateGoogleUser(profile: any): Promise<any>;

    login(user: any): Promise<{
        access_token: string;
    }>;
    logout(token: string): Promise<{
        message: string;
    }>;
    handleRegister: (registerDto: CreateAuthDto) => Promise<{
        success: boolean;
        message: string;
        id: number;
    }>;
    checkCode: (data: codeAuthDto) => Promise<{
        success: boolean;
        message: string;
    }>;
    retryActive: (data: string) => Promise<{
        success: boolean;
        message: string;
        id: number;
    }>;
    retryPassword: (data: string) => Promise<{
        success: boolean;
        message: string;
        id: number;
        email: string;
    }>;
    changePassword: (data: ChangePasswordAuthDto) => Promise<{
        success: boolean;
        message: string;
    }>;
}
