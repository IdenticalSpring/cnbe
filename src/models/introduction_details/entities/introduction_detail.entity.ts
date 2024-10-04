import { Column, Model, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import { CourseIntroductions } from 'src/models/course_introductions/entities/course_introduction.entity';

import { Courses } from 'src/models/courses/entities/courses.entity';


@Table
export class IntroductionDetails extends Model<IntroductionDetails> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    detail: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date;

    @BelongsToMany(() => Courses, () => CourseIntroductions)
    courses: Courses[];
}
