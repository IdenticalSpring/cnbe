import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';
import { Category } from 'src/models/categories/entities/categories.entity';
import { Discussions } from 'src/models/discussion/entities/discussion.entity';

@Table({
  tableName: 'CategoryDiscussion',
  timestamps: false,
})
export class CategoryDiscussion extends Model<CategoryDiscussion> {
  @PrimaryKey
  @ForeignKey(() => Category)
  @Column(DataType.INTEGER)
  categoryId: number;

  @PrimaryKey
  @ForeignKey(() => Discussions)
  @Column(DataType.INTEGER)
  discussionId: number;
}
