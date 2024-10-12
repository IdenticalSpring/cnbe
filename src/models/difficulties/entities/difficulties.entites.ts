import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: 'difficulties',
  timestamps: false,
})
export class Difficulty extends Model<Difficulty> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  name!: string;
}
