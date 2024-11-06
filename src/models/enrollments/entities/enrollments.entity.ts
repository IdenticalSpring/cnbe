import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { User } from 'src/models/users/entities/user.entity';
import { Courses } from '../../courses/entities/courses.entity';

@Table({
  tableName: 'enrollments',
  timestamps: true, 
})
@Table
export class Enrollment extends Model<Enrollment> {
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

  @ForeignKey(() => Courses)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  enrolledAt: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  completed: boolean;
}
