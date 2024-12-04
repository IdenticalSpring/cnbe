import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Discussions } from './entities/discussion.entity';
import { CreateDiscussDto } from './dto/create-discussion.dto';
import { UserDiscussion } from '../user_discussion/entities/user_discussion.entity';
import { User } from '../users/entities/user.entity'; 
import { ConfigService } from '@nestjs/config';

interface DiscussionWithUsername {
  id: number;
  title: string;
  content: string;
  voteUp: number;
  voteDown: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
}

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
    data: DiscussionWithUsername[];
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
      include: [
        {
          model: User, // Lấy thông tin User
          through: { attributes: [] }, // Không lấy các thuộc tính bảng UserDiscussion
          attributes: ['username'], // Lấy chỉ 'username'
        },
      ],
    });

    // Map dữ liệu lấy được từ Sequelize để thêm 'username' cho từng thảo luận
    const data = rows.map((discussion) => {
      const discussionJSON = discussion.toJSON() as Discussions & { users: User[] };
      const username = discussionJSON.users.length > 0 ? discussionJSON.users[0].username : 'Ẩn danh';
      return {
        id: discussionJSON.id,
        title: discussionJSON.title,
        content: discussionJSON.content,
        voteUp: discussionJSON.voteUp,
        voteDown: discussionJSON.voteDown,
        views: discussionJSON.views,
        createdAt: discussionJSON.createdAt,
        updatedAt: discussionJSON.updatedAt,
        username,
      };
    });

    return {
      data,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      totalItems: count,
    };
  }
}
