import { Module } from '@nestjs/common';
import { Lessons } from './entities/course_lesson.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessonsController } from './course_lesson.controller';
import { LessonsService } from './course_lesson.service';
import { OrdersModule } from '../orders/orders.module';
import { Chapter } from '../course_chapter/entities/chapter.entity';


@Module({
  imports: [SequelizeModule.forFeature([Lessons, Chapter]), OrdersModule],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService]
})
export class LessonsModule { }
