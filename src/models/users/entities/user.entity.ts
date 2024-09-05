import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    username: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    codeId: string;
    @Column({
        type: DataType.DATE,  
        allowNull: false,    
    })
    codeExpired: Date;
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    isActive: boolean;
    @Column({
        type: DataType.ENUM('user', 'admin'),
        defaultValue: 'user',
    })
    role: string;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    updatedAt: Date;
}