import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TestCase } from 'src/models/testcase/entities/testcase.entity';

@Table({
  tableName: 'language_code',
  timestamps: false,
})
export class languageCode extends Model<languageCode> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  language_code!: string;

  // @HasMany(() => TestCase)
  // testCases: TestCase[];
}
