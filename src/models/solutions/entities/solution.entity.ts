// solution.entity.ts
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
    PrimaryKey,
    AutoIncrement,
    BelongsTo,
} from 'sequelize-typescript';
import { Problems } from 'src/models/problems/entitites/problems.entity';
import { User } from 'src/models/users/entities/user.entity';


@Table({
    tableName: 'solutions',
    timestamps: true,
})
export class Solutions extends Model<Solutions> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @ForeignKey(() => Problems)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    problemId!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    code!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    language!: string;

    @Column({
        type: DataType.ENUM('pending', 'accepted', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
    })
    status!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0,
    })
    likes!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue: 0,
    })
    dislikes!: number;

    @CreatedAt
    @Column({
        type: DataType.DATE,
        field: 'createdAt',
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        field: 'updatedAt',
    })
    updatedAt!: Date;

    @BelongsTo(() => Problems)
    problem!: Problems;

    @BelongsTo(() => User)
    user!: User;
}
