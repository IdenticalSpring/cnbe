import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { CategoryDiscussion } from 'src/models/categories_discussion/entities/categories_discussion';
import { DiscussionComment } from 'src/models/comments_discussion/entities/comments_discussion.entity';
import { TagDiscussion } from 'src/models/tag_discussion/entities/tag_discussion.entity';
import { UserDiscussion } from 'src/models/user_discussion/entities/user_discussion.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table({
  tableName: 'Discussions',
})
export class Discussions extends Model<Discussions> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  // @ForeignKey(() => User)
  // @Column({
  //   type: DataType.INTEGER,
  //   allowNull: false,
  // })
  // userId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  voteUp: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  views: number;

  @CreatedAt
  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @HasMany(() => TagDiscussion)
  tagDiscussions: TagDiscussion[];

  @HasMany(() => DiscussionComment)
  discussionComments: DiscussionComment[];

  @BelongsToMany(() => User, () => UserDiscussion)
  users: User[];

  @HasMany(() => CategoryDiscussion)
  categoryDiscussions: CategoryDiscussion[];
}
