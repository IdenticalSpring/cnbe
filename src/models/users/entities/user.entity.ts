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
        allowNull: false,
        unique: true,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    password: string;
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    codeId: string;
    @Column({
        type: DataType.DATE,  
        allowNull: true,    
    })
    codeExpired: Date;
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
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