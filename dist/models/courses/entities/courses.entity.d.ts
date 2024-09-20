import { Model } from 'sequelize-typescript';
export declare class Courses extends Model<Courses> {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
