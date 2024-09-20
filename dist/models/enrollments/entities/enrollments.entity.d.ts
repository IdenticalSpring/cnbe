import { Model } from 'sequelize-typescript';
import { User } from 'src/models/users/entities/user.entity';
import { Courses } from '../../courses/entities/courses.entity';
export declare class Enrollment extends Model<Enrollment> {
    id: number;
    userId: number;
    user: User;
    courseId: number;
    course: Courses;
    createdAt: Date;
    updatedAt: Date;
}
