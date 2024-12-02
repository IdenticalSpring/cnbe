import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserLessonProgress } from './entities/progress.entity';
import { UserChapterProgress } from '../user_chapter_progress/entities/user_chapter_progress.entity';
import { UserCourseProgress } from '../user_course_progress/entities/user_course_progress.entity';
import { Lessons } from '../course_lesson/entities/course_lesson.entity';
import { Chapter } from '../course_chapter/entities/chapter.entity';
import { Courses } from '../courses/entities/courses.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(UserLessonProgress)
    private progressModel: typeof UserLessonProgress,

    @InjectModel(UserChapterProgress)
    private chapterProgressModel: typeof UserChapterProgress,

    @InjectModel(UserCourseProgress)
    private courseProgressModel: typeof UserCourseProgress,

    @InjectModel(Lessons)
    private lessonModel: typeof Lessons,

    @InjectModel(Chapter)
    private chapterModel: typeof Chapter,

    @InjectModel(Courses)
    private courseModel: typeof Courses,
  ) {}

  async create(createProgressDto: any): Promise<UserLessonProgress> {
    const existingProgress = await this.progressModel.findOne({
      where: {
        userId: createProgressDto.userId,
        lessonId: createProgressDto.lessonId,
      },
    });
    if (existingProgress) {
      return existingProgress; 
    }
    return await this.progressModel.create(createProgressDto);
  }


  async findAll(): Promise<UserLessonProgress[]> {
    return await this.progressModel.findAll();
  }

  async findOne(id: number): Promise<UserLessonProgress> {
    return await this.progressModel.findByPk(id);
  }

  async update(
    id: number,
    updateProgressDto: any,
  ): Promise<[number, UserLessonProgress[]]> {
    return await this.progressModel.update(updateProgressDto, {
      where: { id },
      returning: true,
    });
  }

  async updateLessonProgress(
    userId: number,
    lessonId: number,
    status: string,
  ): Promise<void> {
    // Cập nhật tiến trình bài học
    const lessonProgress = await this.progressModel.findOne({
      where: { userId, lessonId },
    });

    if (!lessonProgress) {
      throw new Error('Lesson progress not found');
    }

    await lessonProgress.update({ status: 'completed' });

    // Lấy thông tin chapter và course liên quan
    const lesson = await this.lessonModel.findByPk(lessonId);
    const chapterId = lesson.chapterId;
    const chapter = await this.chapterModel.findByPk(chapterId);
    const courseId = chapter.courseId;

    // Cập nhật tiến trình chapter
    await this.updateChapterProgress(userId, chapterId);

    // Cập nhật tiến trình course
    await this.updateCourseProgress(userId, courseId);
  }

  async updateChapterProgress(
    userId: number,
    chapterId: number,
  ): Promise<void> {
    const totalLessons = await this.lessonModel.count({ where: { chapterId } });
    const completedLessons = await this.progressModel.count({
      where: { userId, status: 'completed' },
    });

    const progress =
      totalLessons > 0
        ? (Number(completedLessons) / Number(totalLessons)) * 100
        : 0;

    await this.chapterProgressModel.upsert({
      userId,
      chapterId,
      progress: Math.round(progress),
      status: progress === 100 ? 'completed' : 'in-progress',
    });
  }

  async updateCourseProgress(userId: number, courseId: number): Promise<void> {
    const totalChapters = await this.chapterModel.count({
      where: { courseId },
    });
    const completedChapters = await this.chapterProgressModel.count({
      where: { userId, status: 'completed' },
    });

    const progress =
      totalChapters > 0
        ? (Number(completedChapters) / Number(totalChapters)) * 100
        : 0;

    await this.courseProgressModel.upsert({
      userId,
      courseId,
      progress: Math.round(progress),
      status: progress === 100 ? 'completed' : 'in-progress',
    });
  }

  async remove(id: number): Promise<void> {
    const progress = await this.findOne(id);
    if (progress) {
      await progress.destroy();
    }
  }
  async findAllByUser(userId: number): Promise<UserLessonProgress[]> {
    return await this.progressModel.findAll({ where: { userId } });
  }
  async findAllProgressByCourseId(courseId: number, userId: number): Promise<any[]> {
    // Bước 1: Tìm tất cả lessons thuộc khóa học (courseId) qua bảng Chapter
    const lessons = await this.lessonModel.findAll({
      include: [
        {
          model: Chapter,
          where: { courseId }, // Lọc theo courseId trong bảng Chapter
          required: true, // Đảm bảo chỉ lấy các lessons có Chapter tương ứng
        },
      ],
    });

    if (!lessons || lessons.length === 0) {
      throw new NotFoundException(`No lessons found for course ID: ${courseId}`);
    }

    // Bước 2: Lấy tất cả progress của người dùng cho các bài học này
    const lessonIds = lessons.map((lesson) => lesson.id); // Lấy tất cả lessonId
    const progress = await this.progressModel.findAll({
      where: { userId, lessonId: lessonIds }, // Lọc theo userId và lessonId
    });

    return progress;
  }
}
