import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Courses } from "src/models/courses/entities/courses.entity";
import { Lessons } from "src/models/course_lesson/entities/course_lesson.entity";

@Table
export class Chapter extends Model<Chapter> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Courses)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    courseId: number;

    @BelongsTo(() => Courses)
    course: Courses;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    order: number;

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

    @HasMany(() => Lessons)
    lessons: Lessons[];
}