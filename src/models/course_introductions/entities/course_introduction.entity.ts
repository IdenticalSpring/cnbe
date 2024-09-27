import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Courses } from 'src/models/courses/entities/courses.entity';
import { IntroductionDetails } from 'src/models/introduction_details/entities/introduction_detail.entity';


@Table
export class CourseIntroductions extends Model<CourseIntroductions> {
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

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
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
    @BelongsTo(() => Courses)
    course: Courses;

    @HasMany(() => IntroductionDetails)
    details: IntroductionDetails[];
}
