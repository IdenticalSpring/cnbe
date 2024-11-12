import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chapter } from './entities/chapter.entity';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Lessons } from '../course_lesson/entities/course_lesson.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChapterService {
  private readonly defaultLimit: number;

  constructor(
    @InjectModel(Chapter)
    private readonly chapterModel: typeof Chapter,
    private configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT') || 10;
  }

  async findAllWithPagination(
    page: number = 1,
  ): Promise<{
    data: Chapter[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const limit = Number(this.defaultLimit);
    const offset = (page - 1) * limit;

    const { rows, count } = await this.chapterModel.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['order', 'ASC']],
      include: [{ model: Lessons }],
    });

    const totalPages = Math.ceil(count / limit);

    return {
      data: rows,
      currentPage: page,
      totalPages,
      totalItems: count,
    };
  }

  // Tạo mới một chapter
  async create(createChapterDto: CreateChapterDto): Promise<Chapter> {
    const newChapter = await this.chapterModel.create(createChapterDto);
    return newChapter;
  }

  // Lấy tất cả các chapter của một khóa học (theo thứ tự)
  async findAllByCourse(courseId: number): Promise<Chapter[]> {
    return this.chapterModel.findAll({
      where: { courseId },
      order: [['order', 'ASC']],
    });
  }

  async findOne(id: number): Promise<Chapter> {
    const chapter = await this.chapterModel.findByPk(id, {
      include: [{ model: Lessons }],
    });

    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }

    return chapter;
  }

  // Cập nhật một chapter
  async update(id: number, updateChapterDto: UpdateChapterDto): Promise<Chapter> {
    const chapter = await this.findOne(id);
    await chapter.update(updateChapterDto);
    return chapter;
  }

  // Xóa một chapter
  async remove(id: number): Promise<void> {
    const chapter = await this.findOne(id);
    await chapter.destroy();
  }

  // Thay đổi thứ tự của các chương trong khóa học
  async reorderChapters(courseId: number, orderedIds: number[]): Promise<void> {
    const chapters = await this.findAllByCourse(courseId);
    for (const [index, chapterId] of orderedIds.entries()) {
      const chapter = chapters.find(ch => ch.id === chapterId);
      if (chapter) {
        chapter.order = index + 1;
        await chapter.save();
      }
    }
  }
}
