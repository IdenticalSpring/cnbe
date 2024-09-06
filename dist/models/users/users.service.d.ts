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
        _id: number;
    }>;
    private sendActivationEmail;
    isUsernameExist(username: string): Promise<boolean>;
    handleActive(data: codeAuthDto): Promise<{
        isActive: boolean;
    }>;
    retryActive(email: string): Promise<{
        id: number;
    }>;
    retryPassword(email: string): Promise<{
        id: number;
        email: string;
    }>;
    changePassword(data: ChangePasswordAuthDto): Promise<{
        message: string;
    }>;
}
