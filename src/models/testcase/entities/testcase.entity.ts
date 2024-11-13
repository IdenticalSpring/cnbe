import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { languageCode } from 'src/models/language_code/entities/language_code.entity';
import { Problems } from 'src/models/problems/entitites/problems.entity';

@Table({
  tableName: 'test_case',
  timestamps: false, // Sequelize will automatically manage `createdAt` and `updatedAt`
})
export class TestCase extends Model<TestCase> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @ForeignKey(() => languageCode)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  languageCodeId!: number;

  @ForeignKey(() => Problems)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  problemId!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  testcase!: string;

  @BelongsTo(() => languageCode)
  languageCode!: languageCode;

  @BelongsTo(() => Problems)
  problem!: Problems;
}
