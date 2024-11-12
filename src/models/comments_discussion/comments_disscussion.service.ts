// discussion-comment.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DiscussionComment } from './entities/comments_discussion.entity';
import { CreateDiscussionCommentDto } from './dto/comments_discusiion.dto';
import { Discussions } from '../discussion/entities/discussion.entity';
import { Comments } from '../comments/entities/comments.entity';

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
    return this.discussionCommentModel.findAll({
      include: [
        { model: Comments, attributes: ['id', 'content'] }, // Include related User data
        { model: Discussions, attributes: ['id', 'title'] }, // Include related Discussion data
      ],
    });
  }

  async findPaginatedByDiscussionId(
    discussionId: number,
    page: number = 1,
  ): Promise<{
    data: DiscussionComment[];
    total: number;
    page: number;
    limit: number;
  }> {
    const limit = 10; // Fixed to 10 comments per page
    const offset = (page - 1) * limit; // Calculate offset based on page

    // Fetch comments with pagination and include related data
    const { rows: data, count: total } =
      await this.discussionCommentModel.findAndCountAll({
        where: { discussionId },
        limit,
        offset,
        include: [
          { model: Comments, attributes: ['id', 'content'] }, // Include User data
          { model: Discussions, attributes: ['id', 'title'] }, // Include Discussion data
        ],
      });

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
