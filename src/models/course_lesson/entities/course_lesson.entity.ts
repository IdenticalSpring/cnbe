import { Column, Model, Table, DataType, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Chapter } from "src/models/chapter/entities/chapter.entity";
import { Progress } from 'src/models/progress/entities/progress.entity';

@Table
export class Lessons extends Model<Lessons> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => Chapter)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    chapterId: number;

    @BelongsTo(() => Chapter)
    chapter: Chapter;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    content: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    order: number;

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

    @HasMany(() => Progress)
    progresses: Progress[];
}