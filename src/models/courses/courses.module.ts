import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Courses } from './entities/courses.entity';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { TypesModule } from '../type/types.module';

@Module({
  imports: [SequelizeModule.forFeature([Courses]), CloudinaryModule,TypesModule,],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService], 
})
export class CoursesModule {}
