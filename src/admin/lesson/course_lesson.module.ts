import { Module } from '@nestjs/common';
import { LessonsService } from 'src/models/course_lesson/course_lesson.service';
import { AdminLessonsController } from './course_lesson.controller';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { LessonsModule } from 'src/models/course_lesson/course_lesson.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lessons } from 'src/models/course_lesson/entities/course_lesson.entity';
import { OrdersModule } from 'src/models/orders/orders.module';
import { Chapter } from 'src/models/course_chapter/entities/chapter.entity';


@Module({
  imports: [SequelizeModule.forFeature([Lessons, Chapter]), OrdersModule],
  controllers: [AdminLessonsController],
  providers: [LessonsService, JwtAuthGuard, RolesGuard], 
})
export class AdminLessonsModule { }
