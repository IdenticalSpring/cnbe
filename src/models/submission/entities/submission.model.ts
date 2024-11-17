import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Problems } from 'src/models/problems/entitites/problems.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table
export class Submission extends Model {
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
  user: User; // Thêm quan hệ thuộc về User

  @ForeignKey(() => Problems) // Thiết lập khóa ngoại đến bảng Problem
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  problemId: number;
  @BelongsTo(() => Problems)
  problem: Problems; // Thêm quan hệ thuộc về Problem

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  language: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.ENUM('pending', 'failed', 'completed', 'killed'),
    defaultValue: 'failed',
  })
  status: string;

  @Column(DataType.TEXT)
  output: string;

  @Column(DataType.TEXT)
  error: string;
}
