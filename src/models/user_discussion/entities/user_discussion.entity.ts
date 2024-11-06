import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Discussions } from 'src/models/discussion/entities/discussion.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table({
  tableName: 'UserDiscussions', // Tên bảng trung gian
  timestamps: false, // Không dùng đặt timestamp cho bảng
})
export class UserDiscussion extends Model<UserDiscussion> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Discussions)
  @Column
  discussionId: number;
}
