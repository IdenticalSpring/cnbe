import { Column, Model, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import { Courses } from 'src/models/courses/entities/courses.entity';
import { CourseTypes } from 'src/models/typeCourse/course_types.entity';


@Table
export class Types extends Model<Types> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        unique: true,
    })
    name: string;

    @BelongsToMany(() => Courses, () => CourseTypes)
    courses: Courses[];
}
