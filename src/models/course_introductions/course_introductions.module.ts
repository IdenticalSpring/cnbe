import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseIntroductions } from './entities/course_introduction.entity';
import { CourseIntroductionsService } from './course_introductions.service';
import { CourseIntroductionsController } from './course_introductions.controller';



@Module({
  imports: [SequelizeModule.forFeature([CourseIntroductions])],
  controllers: [CourseIntroductionsController],
  providers: [CourseIntroductionsService],
  exports: [CourseIntroductionsService],
})
export class CourseIntroductionsModule { }
