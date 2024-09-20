import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
  BeforeUpdate,
} from 'sequelize-typescript';
import { User } from 'src/models/users/entities/user.entity';
import { Exercises } from '../../exercises/entitites/exercises.entity';

@Table({
  tableName: 'process',
  timestamps: false, // Assuming you don't want Sequelize to automatically add `createdAt` and `updatedAt` fields
})
export class Process extends Model<Process> {
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

  @ForeignKey(() => Exercises)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  exerciseId!: number;

  @BelongsTo(() => Exercises)
  exercise!: Exercises;

  @Column({
    type: DataType.ENUM('pending', 'in-progress', 'completed'),
    defaultValue: 'pending',
    allowNull: false,
  })
  status!: 'pending' | 'in-progress' | 'completed';

  @Column({
    type: DataType.DATE,
    field: 'completeAt',
  })
  completeAt!: Date;

  @BeforeUpdate
  static updateCompleteAt(instance: Process) {
    if (instance.status === 'completed') {
      instance.completeAt = new Date();
    }
  }
}
