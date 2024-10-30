// src/models/problem_topics/entities/problem_topics.entity.ts
import {
  Table,
  Column,
  Model,
  ForeignKey,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';
import { Problems } from 'src/models/problems/entitites/problems.entity';
import { Topics } from 'src/models/topics/entities/topics.entities';

@Table({
  tableName: 'problem_topics',
  timestamps: false,
})
export class ProblemTopics extends Model<ProblemTopics> {
  @PrimaryKey
  @ForeignKey(() => Problems)
  @Column({
    type: DataType.INTEGER,
  })
  problemId!: number;

  @PrimaryKey
  @ForeignKey(() => Topics)
  @Column({
    type: DataType.INTEGER,
  })
  topicId!: number;
}
