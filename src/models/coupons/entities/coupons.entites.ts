import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'coupons',
  timestamps: true, // Sequelize will automatically manage `createdAt` and `updatedAt`
})
export class Coupons extends Model<Coupons> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id!: number;
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  code!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  discountAmount!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  validFrom!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  validTo!: Date;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  isActive: boolean;
}
