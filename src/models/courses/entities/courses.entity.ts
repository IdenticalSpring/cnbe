import { Column, Model, Table, DataType, BelongsToMany } from 'sequelize-typescript';
import {  CourseIntroductions } from 'src/models/course_introductions/entities/course_introduction.entity';
import { IntroductionDetails } from 'src/models/introduction_details/entities/introduction_detail.entity';


@Table
export class Courses extends Model<Courses> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  imageUrl: string;

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

  @BelongsToMany(() => IntroductionDetails, () => CourseIntroductions)
  introductionDetails: IntroductionDetails[];
}
