import { Column, Model, Table, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { CourseIntroductions } from 'src/models/course_introductions/entities/course_introduction.entity';
import { Lessons } from 'src/models/course_lesson/entities/course_lesson.entity';
import { Types } from 'src/models/type/entities/types.entity';
import { CourseTypes } from 'src/models/typeCourse/course_types.entity';

@Table
export class Courses extends Model<Courses> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  imageUrl: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00,
  })
  price: number;  

  @Column({
    type: DataType.ENUM('active', 'inactive', 'draft'),
    allowNull: false,
    defaultValue: 'draft',
  })
  status: string; 

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

  @HasMany(() => CourseIntroductions)
  courseIntroductions: CourseIntroductions[];

  @BelongsToMany(() => Types, () => CourseTypes)
  types: Types[];

  @HasMany(() => Lessons)
  lessons: Lessons[];
}
