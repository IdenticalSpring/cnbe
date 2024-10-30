import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';
import { Problems } from '../../problems/entitites/problems.entity';
import { Companies } from '../../companies/entities/companies.entities';

@Table({
  tableName: 'problem_companies',
  timestamps: false,
})
export class ProblemCompanies extends Model<ProblemCompanies> {
  @PrimaryKey
  @ForeignKey(() => Problems)
  @Column({
    type: DataType.INTEGER,
  })
  problemId!: number;

  @PrimaryKey
  @ForeignKey(() => Companies)
  @Column({
    type: DataType.INTEGER,
  })
  companyId!: number;
}
