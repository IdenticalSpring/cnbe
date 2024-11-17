import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserChapterProgress } from './entities/user_chapter_progress.entity';
import { CreateUserChapterProgressDto } from './dto/create-user_chapter_progress.dto';
import { UpdateUserChapterProgressDto } from './dto/update-user_chapter_progress.dto';

@Injectable()
export class UserChapterProgressService {
  constructor(
    @InjectModel(UserChapterProgress)
    private readonly userChapterProgressModel: typeof UserChapterProgress,
  ) {}

  async create(
    dto: CreateUserChapterProgressDto,
  ): Promise<UserChapterProgress> {
    return this.userChapterProgressModel.create(dto);
  }

  async findAll(): Promise<UserChapterProgress[]> {
    return this.userChapterProgressModel.findAll();
  }

  async findOne(id: number): Promise<UserChapterProgress> {
    const progress = await this.userChapterProgressModel.findByPk(id);
    if (!progress) {
      throw new NotFoundException(
        `UserChapterProgress with ID ${id} not found`,
      );
    }
    return progress;
  }

  async update(
    id: number,
    dto: UpdateUserChapterProgressDto,
  ): Promise<UserChapterProgress> {
    const progress = await this.findOne(id);
    return progress.update(dto);
  }

  async delete(id: number): Promise<void> {
    const progress = await this.findOne(id);
    await progress.destroy();
  }
}
