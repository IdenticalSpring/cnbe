import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserCourseProgress } from './entities/user_course_progress.entity';
import { CreateUserCourseProgressDto } from './dto/create-user_course_progress.dto';
import { UpdateUserCourseProgressDto } from './dto/update-user_controller_progress.dto';

@Injectable()
export class UserCourseProgressService {
  constructor(
    @InjectModel(UserCourseProgress)
    private readonly userCourseProgressModel: typeof UserCourseProgress,
  ) {}

  async create(dto: CreateUserCourseProgressDto): Promise<UserCourseProgress> {
    return this.userCourseProgressModel.create(dto);
  }

  async findAll(): Promise<UserCourseProgress[]> {
    return this.userCourseProgressModel.findAll();
  }

  async findOne(id: number): Promise<UserCourseProgress> {
    const progress = await this.userCourseProgressModel.findByPk(id);
    if (!progress) {
      throw new NotFoundException(`UserCourseProgress with ID ${id} not found`);
    }
    return progress;
  }

  async update(
    id: number,
    dto: UpdateUserCourseProgressDto,
  ): Promise<UserCourseProgress> {
    const progress = await this.findOne(id);
    return progress.update(dto);
  }

  async delete(id: number): Promise<void> {
    const progress = await this.findOne(id);
    await progress.destroy();
  }
}
