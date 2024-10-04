import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
} from 'sequelize-typescript';
import { Coupons } from 'src/models/coupons/entities/coupons.entites';
import { Courses } from 'src/models/courses/entities/courses.entity';
import { User } from 'src/models/users/entities/user.entity';

@Table({
  tableName: 'orders',
  timestamps: true, // Sequelize will automatically manage `createdAt` and `updatedAt`
})
export class Orders extends Model<Orders> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Courses)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  courseId!: number;

  @BelongsTo(() => Courses)
  course!: Courses;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  price: number;

  @ForeignKey(() => Coupons)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  discountId!: number;

  @BelongsTo(() => Coupons)
  coupon!: Coupons;

  @Column({
    type: DataType.ENUM('ZaloPay', 'paypal', 'Momo'),
    allowNull: false,
  })
  paymentMethod: string;

  @Column({
    type: DataType.ENUM('pending', 'in-progress', 'completed'),
    allowNull: false,
  })
  paymentStatus: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  paymentDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  updatedAt: Date;
}
