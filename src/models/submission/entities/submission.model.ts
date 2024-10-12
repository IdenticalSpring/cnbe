import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
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
    type: DataType.ENUM('failed', 'completed'),
    defaultValue: 'failed',
  })
  status: string;

  @Column(DataType.TEXT)
  output: string;

  @Column(DataType.TEXT) // Cần thêm kiểu dữ liệu cho trường error
  error: string;
}
