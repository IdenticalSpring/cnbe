import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
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

    @ForeignKey(() => IntroductionDetails)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    introductionDetailId: number;

    @Column({
        type: DataType.TEXT,
        allowNull: true, 
    })
    description: string;

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

    @BelongsTo(() => IntroductionDetails)
    introductionDetail: IntroductionDetails;
}
