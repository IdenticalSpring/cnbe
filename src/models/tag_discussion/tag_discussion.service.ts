import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TagDiscussion } from './entities/tag_discussion.entity';
import { Tag } from '../tags/entities/tags.entity';
import { Discussions } from '../discussion/entities/discussion.entity';

@Injectable()
export class TagDiscussionService {
  constructor(
    @InjectModel(TagDiscussion)
    private tagDiscussionModel: typeof TagDiscussion,
  ) {}

  // Tạo mối quan hệ giữa Tag và Discussion
  async create(tagId: number, discussionId: number): Promise<TagDiscussion> {
    return this.tagDiscussionModel.create({ tagId, discussionId });
  }

  // Lọc và phân trang dữ liệu
  async findAll(
    filter: { tagId?: number; discussionId?: number },
    page: number = 1,
    limit: number = 20,
  ): Promise<{
    data: TagDiscussion[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * limit;

    const { count, rows } = await this.tagDiscussionModel.findAndCountAll({
      where: {
        ...(filter.tagId && { tagId: filter.tagId }), // Lọc theo tagId nếu có
        ...(filter.discussionId && { discussionId: filter.discussionId }), // Lọc theo discussionId nếu có
      },
      include: [
        { model: Tag, attributes: ['id', 'name'] },
        { model: Discussions, attributes: ['id', 'title'] },
      ],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return {
      data: rows,
      total: count,
      currentPage: page,
      totalPages,
    };
  }
}
