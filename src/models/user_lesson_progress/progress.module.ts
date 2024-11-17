import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { UserLessonProgress } from './entities/progress.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserChapterProgress } from '../user_chapter_progress/entities/user_chapter_progress.entity';
import { UserCourseProgress } from '../user_course_progress/entities/user_course_progress.entity';
import { Lessons } from '../course_lesson/entities/course_lesson.entity';
import { Chapter } from '../course_chapter/entities/chapter.entity';
import { Courses } from '../courses/entities/courses.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      UserLessonProgress,
      UserChapterProgress,
      UserCourseProgress,
      Lessons,
      Chapter,
      Courses,
    ]),
  ],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
