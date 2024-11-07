import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsToMany,
} from 'sequelize-typescript';
import { Problems } from 'src/models/problems/entitites/problems.entity';
import { ProblemCompanies } from 'src/models/problems_companies/entities/problems_companies.entits';

@Table({
  tableName: 'companies',
  timestamps: false,
})
export class Companies extends Model<Companies> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name!: string;

  @BelongsToMany(() => Problems, () => ProblemCompanies)
  problems!: Problems[];
}
