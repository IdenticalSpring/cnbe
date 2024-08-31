import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    id: number;
    name: string;
    email: string;
    password: string;
    codeId: string;
    codeExpired: Date;
    isActive: boolean;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
