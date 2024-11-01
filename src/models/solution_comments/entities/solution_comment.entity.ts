
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
import { Solutions } from 'src/models/solutions/entities/solution.entity';
import { User } from 'src/models/users/entities/user.entity';


@Table({
    tableName: 'solution_comments',
    timestamps: true,
})
export class SolutionComments extends Model<SolutionComments> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @ForeignKey(() => Solutions)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    solutionId!: number;

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
    comment!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: 0, 
    })
    isReplied!: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    repliedToCommentId?: number; 

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

    @BelongsTo(() => Solutions)
    solution!: Solutions;

    @BelongsTo(() => User)
    user!: User;
}
