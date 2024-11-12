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

  // Phương thức để tạo mối quan hệ giữa Tag và Discuss
  async create(tagId: number, discussionId: number): Promise<TagDiscussion> {
    return this.tagDiscussionModel.create({ tagId, discussionId });
  }

  // Thêm các phương thức khác nếu cần

  async findAll(): Promise<TagDiscussion[]> {
    return this.tagDiscussionModel.findAll({
      include: [
        { model: Tag, attributes: ['id', 'name'] },
        { model: Discussions, attributes: ['id', 'title'] },
      ],
    });
  }
}
