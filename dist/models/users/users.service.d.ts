import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userModel;
    constructor(userModel: typeof User);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): string;
    remove(id: number): string;
}
