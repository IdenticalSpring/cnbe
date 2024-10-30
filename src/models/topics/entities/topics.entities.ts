// src/models/topics/entities/topics.entity.ts
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
import { ProblemTopics } from 'src/models/problems_topics/entities/problems_topics.entities';

@Table({
  tableName: 'topics',
  timestamps: false,
})
export class Topics extends Model<Topics> {
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

  @BelongsToMany(() => Problems, () => ProblemTopics)
  problems!: Problems[];
}
