import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Courses } from './entities/courses.entity';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  imports: [SequelizeModule.forFeature([Courses])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
