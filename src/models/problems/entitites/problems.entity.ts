import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
} from 'sequelize-typescript';
import { Companies } from 'src/models/companies/entities/companies.entities';
import { ProblemCompanies } from 'src/models/problems_companies/entities/problems_companies.entits';
import { Courses } from 'src/models/courses/entities/courses.entity';
import { Difficulty } from 'src/models/difficulties/entities/difficulties.entites';

@Table({
  tableName: 'problems',
  timestamps: true,
})
export class Problems extends Model<Problems> {
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
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description!: string;

  @ForeignKey(() => Difficulty)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  difficultyId!: number;

  @BelongsTo(() => Difficulty)
  difficulty!: Difficulty;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  accepted: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  submissions: number;

  @ForeignKey(() => Courses)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId!: number;

  @BelongsTo(() => Courses)
  course!: Courses;

  @BelongsToMany(() => Companies, () => ProblemCompanies)
  companies!: Companies[];

  @Column({
    type: DataType.ENUM('active', 'inactive', 'archived'), 
    allowNull: false,
    defaultValue: 'active', 
  })
  status!: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'createdAt',
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    field: 'updatedAt',
  })
  updatedAt!: Date;
}
