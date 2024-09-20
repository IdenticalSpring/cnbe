import { Model } from 'sequelize-typescript';
import { User } from 'src/models/users/entities/user.entity';
import { Exercises } from '../../exercises/entitites/exercises.entity';
export declare class Process extends Model<Process> {
    id: number;
    userId: number;
    user: User;
    exerciseId: number;
    exercise: Exercises;
    status: 'pending' | 'in-progress' | 'completed';
    completeAt: Date;
    static updateCompleteAt(instance: Process): void;
}
