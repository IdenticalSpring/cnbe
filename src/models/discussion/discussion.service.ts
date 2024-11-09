import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Discussions } from './entities/discussion.entity';
import { CreateDiscussDto } from './dto/create-discussion.dto';
import { UserDiscussion } from '../user_discussion/entities/user_discussion.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscussService {
  private readonly defaultLimit: number;
  constructor(
    @InjectModel(Discussions)
    private readonly discussModel: typeof Discussions,
    @InjectModel(UserDiscussion)
    private readonly userDiscussionModel: typeof UserDiscussion,
    private configService: ConfigService,
  ) {
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT') || 20;
  }

  async create(data: CreateDiscussDto, userId: number): Promise<Discussions> {
    // Tạo thảo luận mới
    const discussion = await this.discussModel.create(data);

    // Lưu thông tin vào bảng UserDiscussion
    await this.userDiscussionModel.create({
      userId: userId,
      discussionId: discussion.id,
    });

    return discussion;
  }

  async findAll(): Promise<Discussions[]> {
    return this.discussModel.findAll();
  }

  async findOne(id: number): Promise<Discussions> {
    return this.discussModel.findByPk(id);
  }

  async update(id: number, data: CreateDiscussDto): Promise<Discussions> {
    const discuss = await this.findOne(id);
    if (discuss) {
      await discuss.update(data);
    }
    return discuss;
  }

  async upvoteDiscuss(id: number): Promise<Discussions> {
    const discuss = await this.discussModel.findByPk(id);
    if (discuss) {
      discuss.voteUp += 1;
      await discuss.save();
    }
    return discuss;
  }

  async delete(id: number): Promise<void> {
    const discuss = await this.findOne(id);
    if (discuss) {
      await discuss.destroy();
    }
  }
  async findAllPagination(page: number): Promise<{
    data: Discussions[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }> {
    const limit = parseInt(this.defaultLimit.toString(), 10);
    const offset = (page - 1) * limit;

    const { rows, count } = await this.discussModel.findAndCountAll({
      offset,
      limit,
      order: [['createdAt', 'DESC']],
    });

    return {
      data: rows,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    };
  }
}
