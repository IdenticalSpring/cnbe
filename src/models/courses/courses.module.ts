import { forwardRef, Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Courses } from './entities/courses.entity';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TypesModule } from '../type/types.module';
import { OrdersModule } from '../orders/orders.module';
import { CourseAccessGuard } from 'src/guard/course-access.guard';

@Module({
  imports: [SequelizeModule.forFeature([Courses]), CloudinaryModule, TypesModule, forwardRef(() => OrdersModule)],
  controllers: [CoursesController],
  providers: [CoursesService, CourseAccessGuard],
  exports: [CoursesService], 
})
export class CoursesModule {}
