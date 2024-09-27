import { Module } from '@nestjs/common';
import { AdminCourseIntroductionsController } from './course-introductions.controller';
import { RolesGuard } from 'src/auth/passport/roles.guard';
import { JwtAuthGuard } from 'src/auth/passport/jwt-auth.guard';
import { CourseIntroductionsModule } from 'src/models/course_introductions/course_introductions.module';


@Module({
    imports: [CourseIntroductionsModule], 
    controllers: [AdminCourseIntroductionsController], 
    providers: [RolesGuard, JwtAuthGuard],
})
export class AdminCourseIntroductionsModule { }
