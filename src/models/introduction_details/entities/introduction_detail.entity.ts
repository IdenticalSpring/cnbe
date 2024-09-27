import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { CourseIntroductions } from 'src/models/course_introductions/entities/course_introduction.entity';


@Table
export class IntroductionDetails extends Model<IntroductionDetails> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => CourseIntroductions)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    introductionId: number;

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
    
    @BelongsTo(() => CourseIntroductions)
    introduction: CourseIntroductions;
}
