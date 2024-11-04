import { Column, Model, Table, ForeignKey, DataType } from 'sequelize-typescript';
import { Courses } from '../courses/entities/courses.entity';
import { Types } from '../type/entities/types.entity';

@Table
export class CourseTypes extends Model<CourseTypes> {
    @ForeignKey(() => Courses)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    courseId: number;

    @ForeignKey(() => Types)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    typeId: number;
}
