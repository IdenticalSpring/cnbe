import { Model } from 'sequelize-typescript';
import { Courses } from 'src/models/courses/entities/courses.entity';
export declare class Exercises extends Model<Exercises> {
    id: number;
    title: string;
    description: string;
    difficulty: string;
    courseId: number;
    course: Courses;
    createdAt: Date;
    updatedAt: Date;
}
