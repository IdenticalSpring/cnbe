// src/models/categories/entities/category.entity.ts
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { CategoryDiscussion } from 'src/models/categories_discussion/entities/categories_discussion';

@Table({
  tableName: 'categories',
})
export class Category extends Model<Category> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt: Date;

  @HasMany(() => CategoryDiscussion)
  categoryDiscussions: CategoryDiscussion[];
}
