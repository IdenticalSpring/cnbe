import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDiscussion } from './entities/user_discussion.entity';
import { CreateUserDiscussionDto } from './dto/user_discussion.dto';

@Injectable()
export class UserDiscussionService {
  constructor(
    @InjectModel(UserDiscussion)
    private readonly userDiscussionModel: typeof UserDiscussion,
  ) {}

  async create(
    createUserDiscussionDto: CreateUserDiscussionDto,
  ): Promise<UserDiscussion> {
    return this.userDiscussionModel.create(createUserDiscussionDto);
  }

  async findAll(): Promise<UserDiscussion[]> {
    return this.userDiscussionModel.findAll();
  }

  async findOne(id: number): Promise<UserDiscussion> {
    const userDiscussion = await this.userDiscussionModel.findByPk(id);
    if (!userDiscussion) {
      throw new NotFoundException('UserDiscussion not found');
    }
    return userDiscussion;
  }

  async remove(id: number): Promise<void> {
    const userDiscussion = await this.findOne(id);
    await userDiscussion.destroy();
  }
}