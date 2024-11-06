
import { Progress } from 'src/models/progress/entities/progress.entity';
import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Comments } from 'src/models/comments/entities/comments.entity';
import { UserComments } from 'src/models/comments_user/entities/commets_user.entity';
import { Discussions } from 'src/models/discussion/entities/discussion.entity';
import { Submission } from 'src/models/submission/entities/submission.model';
import { UserDiscussion } from 'src/models/user_discussion/entities/user_discussion.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  codeId: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  codeExpired: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  isActive: boolean;

  @Column({
    type: DataType.ENUM('user', 'admin'),
    defaultValue: 'user',
  })
  role: string;

  @HasMany(() => Submission)
  submissions: Submission[];

  @BelongsToMany(() => Comments, () => UserComments)
  comments: Comments[];

  @BelongsToMany(() => Discussions, () => UserDiscussion)
  discussions: Discussions[];

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
  @HasMany(() => Progress)
  progresses: Progress[];

}

