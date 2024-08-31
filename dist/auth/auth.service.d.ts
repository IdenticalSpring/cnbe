import { UsersService } from '../models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        user: {
            email: any;
            id: any;
            name: any;
        };
        access_token: string;
    }>;
    handleRegister: (registerDto: CreateAuthDto) => Promise<{
        _id: number;
    }>;
}
