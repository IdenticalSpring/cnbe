import { Column, Model, Table, DataType, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Courses } from "src/models/courses/entities/courses.entity";
import { Progress } from 'src/models/progress/entities/progress.entity';

@Table
export class Lessons extends Model<Lessons> {
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
    content: string;

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
    @HasMany(() => Progress)
    progresses: Progress[];


    
}
