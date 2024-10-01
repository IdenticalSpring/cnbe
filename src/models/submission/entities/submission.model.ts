import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Submission extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

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
  error: string;
}
