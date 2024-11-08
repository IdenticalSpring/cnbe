import { Module } from '@nestjs/common';
import { Lessons } from './entities/course_lesson.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { LessonsController } from './course_lesson.controller';
import { LessonsService } from './course_lesson.service';
import { OrdersModule } from '../orders/orders.module';


@Module({
  imports: [SequelizeModule.forFeature([Lessons]), OrdersModule],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule { }
