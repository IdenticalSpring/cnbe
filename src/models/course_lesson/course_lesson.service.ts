import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lessons } from './entities/course_lesson.entity';
import { ConfigService } from '@nestjs/config';
import { Courses } from '../courses/entities/courses.entity';
import { Chapter } from '../course_chapter/entities/chapter.entity';


@Injectable()
export class LessonsService {
  private readonly defaultLimit: number ;
  constructor(
    @InjectModel(Lessons)
    private lessonsModel: typeof Lessons,
    private configService: ConfigService,
    @InjectModel(Chapter)
    private chapterModel: typeof Chapter,
  ) { 
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT') || 20;
  }

  // Tạo mới bài học
  async create(createLessonDto: any): Promise<Lessons> {
    const chapterExists = await this.chapterModel.findByPk(createLessonDto.chapterId);
    if (!chapterExists) {
      throw new BadRequestException('Chapter ID does not exist');
    }
    return await this.lessonsModel.create(createLessonDto);
  }

  // Lấy tất cả bài học
  async findAll(): Promise<Lessons[]> {
    const lessons = await this.lessonsModel.findAll({
      include: [
        {
          model: Chapter,
          attributes: ['id'], 
        }
      ],
      order: [['order', 'ASC']],
    });

    // Thêm courseId vào dataValues của mỗi bài học để dễ truy cập
    lessons.forEach((lesson: any) => {
      lesson.dataValues.courseId = lesson.chapter ? lesson.chapter.courseId : null;
    });

    return lessons;
  }


  // Lấy chi tiết một bài học
  async findOne(id: number): Promise<Lessons> {
    return await this.lessonsModel.findByPk(id);
  }

  // Cập nhật bài học
  async update(id: number, updateLessonDto: any): Promise<[number, Lessons[]]> {
    return await this.lessonsModel.update(updateLessonDto, {
      where: { id },
      returning: true,
    });
  }

  // Xóa bài học
  async remove(id: number): Promise<void> {
    const lesson = await this.findOne(id);
    if (lesson) {
      await lesson.destroy();
    }
  }
  async findByChapterId(chapterId: number): Promise<Lessons[]> {
    return this.lessonsModel.findAll({
      where: { chapterId },
      order: [['order', 'ASC']], 
    });
  }
  async findAllWithPagination(page: number = 1): Promise<{
    data: Lessons[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const limit = Number(this.defaultLimit);
    const offset = (page - 1) * limit;

    const { rows, count } = await this.lessonsModel.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['order', 'ASC']],
      include: [
        {
          model: Chapter,
          attributes: ['id', 'courseId'],
        }
      ],
    });

    const totalPages = Math.ceil(count / limit);

    rows.forEach((lesson: any) => {
      lesson.dataValues.courseId = lesson.chapter ? lesson.chapter.courseId : null;
    });

    return {
      data: rows,
      currentPage: page,
      totalPages,
      totalItems: count,
    };
  }
}
