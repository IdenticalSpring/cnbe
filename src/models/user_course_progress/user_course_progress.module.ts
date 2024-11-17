import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCourseProgressService } from './user_course_progress.service';
import { UserCourseProgressController } from './user_course_progress.controller';
import { UserCourseProgress } from './entities/user_course_progress.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserCourseProgress])],
  controllers: [UserCourseProgressController],
  providers: [UserCourseProgressService],
})
export class UserCourseProgressModule {}
