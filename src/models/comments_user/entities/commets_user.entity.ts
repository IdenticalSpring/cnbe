import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { Comments } from 'src/models/comments/entities/comments.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table({
  tableName: 'user_comments',
  timestamps: false,
})
export class UserComments extends Model<UserComments> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Comments)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  commentId: number;

  @BelongsTo(() => Comments)
  comment: Comments;

  @BelongsTo(() => User)
  user: User;
}
