import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Submission } from 'src/models/submission/entities/submission.model';
import { User } from 'src/models/users/entities/user.entity';

@Table
export class AcceptanceSubmission extends Model {
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
  user: User;

  @ForeignKey(() => Submission)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  submissionId: number; // Change from problemId to submissionId

  @BelongsTo(() => Submission)
  submission: Submission; // Change from problem to submission

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
    type: DataType.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending',
  })
  status: string;

  @Column(DataType.TEXT)
  output: string;

  @Column(DataType.TEXT)
  error: string;
}
