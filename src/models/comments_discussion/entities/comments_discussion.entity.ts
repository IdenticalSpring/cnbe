import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Comments } from 'src/models/comments/entities/comments.entity';
import { Discussions } from 'src/models/discussion/entities/discussion.entity';

@Table({
  tableName: 'DiscussionComments',
})
export class DiscussionComment extends Model<DiscussionComment> {
  @ForeignKey(() => Discussions)
  @Column
  discussionId: number;

  @ForeignKey(() => Comments)
  @Column
  commentId: number;
}
