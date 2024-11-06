import { Module } from '@nestjs/common';
import { Lessons } from './entities/course_lesson.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessonsController } from './course_lesson.controller';
import { LessonsService } from './course_lesson.service';


@Module({
  imports: [SequelizeModule.forFeature([Lessons])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule { }
