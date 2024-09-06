import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ChangePasswordAuthDto, codeAuthDto } from 'src/auth/dto/code-auth.dto';
export declare class UsersService {
    private userModel;
    private readonly mailerService;
    constructor(userModel: typeof User, mailerService: MailerService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): string;
    findByUsername(username: string): Promise<User | null>;
    remove(id: number): string;
    handleRegister(registerDto: CreateAuthDto): Promise<{
        success: boolean;
        message: string;
        id: number;
    }>;
    private sendActivationEmail;
    isUsernameExist(username: string): Promise<boolean>;
    handleActive(data: codeAuthDto): Promise<{
        success: boolean;
        message: string;
    }>;
    retryActive(email: string): Promise<{
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
}
