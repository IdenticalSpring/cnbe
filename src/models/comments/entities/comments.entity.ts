import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { DiscussionComment } from 'src/models/comments_discussion/entities/comments_discussion.entity';
import { UserComments } from 'src/models/comments_user/entities/commets_user.entity';
import { Discussions } from 'src/models/discussion/entities/discussion.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table({
  tableName: 'comments',
  timestamps: true,
})
export class Comments extends Model<Comments> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @ForeignKey(() => Comments)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  parentId: number;

  @HasMany(() => Comments, 'parentId')
  replies: Comment[];

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  voteUp: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  voteDown: number;

  @Column({
    type: DataType.STRING,
    defaultValue: 'active',
  })
  status: string;

  @BelongsToMany(() => User, () => UserComments)
  users: User[];

  @HasMany(() => DiscussionComment)
  discussionComments: DiscussionComment[];
}
