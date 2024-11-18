import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Discussions } from '../../discussion/entities/discussion.entity';
import { User } from '../../users/entities/user.entity';

@Table({
  tableName: 'user_votes',
  timestamps: true,
})
export class UserVote extends Model<UserVote> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => Discussions)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  discussionId!: number;

  @Unique('user_discussion_unique')
  @Column({
    type: DataType.ENUM,
    values: ['upvote', 'downvote'],
    allowNull: false,
  })
  voteType: 'upvote' | 'downvote';

  @Column({
    type: DataType.DATE,
  })
  createdAt?: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt?: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Discussions)
  discussion: Discussions;
}
