import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Chapter } from 'src/models/course_chapter/entities/chapter.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table({
  tableName: 'user_chapter_progress',
  timestamps: true,
})
export class UserChapterProgress extends Model<UserChapterProgress> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Chapter)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  chapterId: number;

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

  @BelongsTo(() => Chapter)
  chapter: Chapter;
}
