import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Chapter } from 'src/models/course_chapter/entities/chapter.entity';
import { Lessons } from 'src/models/course_lesson/entities/course_lesson.entity';
import { Courses } from 'src/models/courses/entities/courses.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table({
  tableName: 'user_lesson_progress',
})
export class UserLessonProgress extends Model<UserLessonProgress> {
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
    type: DataType.ENUM('not-started', 'in-progress', 'completed'),
    allowNull: false,
    defaultValue: 'not-started',
  })
  status: 'not-started' | 'in-progress' | 'completed';

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  completedAt: Date | null;
}
