import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { TagDiscussion } from 'src/models/tag_discussion/entities/tag_discussion.entity';

@Table({
  tableName: 'tags',
  timestamps: false,
})
export class Tag extends Model<Tag> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Đảm bảo mỗi tag là duy nhất
  })
  name: string;

  @HasMany(() => TagDiscussion)
  tagDiscussions: TagDiscussion[];
}
