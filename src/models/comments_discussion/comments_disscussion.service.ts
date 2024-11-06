// discussion-comment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DiscussionComment } from './entities/comments_discussion.entity';
import { CreateDiscussionCommentDto } from './dto/comments_discusiion.dto';

@Injectable()
export class DiscussionCommentService {
  constructor(
    @InjectModel(DiscussionComment)
    private discussionCommentModel: typeof DiscussionComment,
  ) {}

  async create(
    createDiscussionCommentDto: CreateDiscussionCommentDto,
  ): Promise<DiscussionComment> {
    return this.discussionCommentModel.create(createDiscussionCommentDto);
  }

  async findAll(): Promise<DiscussionComment[]> {
    return this.discussionCommentModel.findAll();
  }

  async findByDiscussionId(discussionId: number): Promise<DiscussionComment[]> {
    return this.discussionCommentModel.findAll({
      where: { discussionId },
    });
  }
}
