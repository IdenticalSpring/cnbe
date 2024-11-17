import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Courses } from 'src/models/courses/entities/courses.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table({
  tableName: 'user_course_progress',
  timestamps: true,
})
export class UserCourseProgress extends Model<UserCourseProgress> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Courses)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  progress: number; // Tiến trình (phần trăm)

  @Column({
    type: DataType.ENUM('not-started', 'in-progress', 'completed'),
    allowNull: false,
    defaultValue: 'not-started',
  })
  status: 'not-started' | 'in-progress' | 'completed';

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Courses)
  course: Courses;
}
