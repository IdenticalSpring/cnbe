import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    id: number;
    username: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
