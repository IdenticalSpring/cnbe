import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Chapter } from 'src/models/course_chapter/entities/chapter.entity';
import { UserLessonProgress } from 'src/models/user_lesson_progress/entities/progress.entity';

@Table
export class Lessons extends Model<Lessons> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Chapter)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  chapterId: number;

  @BelongsTo(() => Chapter)
  chapter: Chapter;

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
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  order: number;

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

  @HasMany(() => UserLessonProgress)
  progresses: UserLessonProgress[];

  get courseId(): number | undefined {
    return this.chapter ? this.chapter.courseId : undefined;
  }
}
