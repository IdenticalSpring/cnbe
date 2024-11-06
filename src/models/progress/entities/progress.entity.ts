import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Lessons } from "src/models/course_lesson/entities/course_lesson.entity";
import { User } from 'src/models/users/entities/user.entity';

@Table
export class Progress extends Model<Progress> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;
    @BelongsTo(() => User)
    user: User;
    @ForeignKey(() => Lessons)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    lessonId: number;
    @BelongsTo(() => Lessons)
    lesson: Lessons;
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    completed: boolean;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    lastAccessed: Date;


    
}
