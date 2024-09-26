import { Module } from '@nestjs/common';
import { AdminCoursesController } from './courses.controller'; 
import { CoursesModule } from 'src/models/courses/courses.module';
import { CloudinaryModule } from 'src/models/cloudinary/cloudinary.module';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';

@Module({
  imports: [CoursesModule, CloudinaryModule], 
  controllers: [AdminCoursesController], 
  providers: [RolesGuard,JwtAuthGuard], 
})
export class AdminCoursesModule { }
