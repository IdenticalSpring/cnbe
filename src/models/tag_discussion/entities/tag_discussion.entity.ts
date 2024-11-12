import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Discussions } from 'src/models/discussion/entities/discussion.entity';
import { Tag } from 'src/models/tags/entities/tags.entity';

@Table({
  tableName: 'tag_discussion',
  timestamps: false,
})
export class TagDiscussion extends Model<TagDiscussion> {
  @ForeignKey(() => Tag)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  tagId: number;

  @ForeignKey(() => Discussions)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  discussionId: number;

  @BelongsTo(() => Tag)
  tag: Tag;

  @BelongsTo(() => Discussions)
  discussion: Discussions;
}
