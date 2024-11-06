import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Lessons } from './entities/course_lesson.entity';


@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lessons)
    private lessonsModel: typeof Lessons,
  ) { }

  // Tạo mới bài học
  async create(createLessonDto: any): Promise<Lessons> {
    return await this.lessonsModel.create(createLessonDto);
  }

  // Lấy tất cả bài học
  async findAll(): Promise<Lessons[]> {
    return await this.lessonsModel.findAll();
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
}
