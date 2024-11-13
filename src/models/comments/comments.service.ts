import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './entities/comments.entity';
import { CreateCommentDto } from './dto/create-comments.dto';
import { UpdateCommentDto } from './dto/update-comments.dto';
import { Discussions } from '../discussion/entities/discussion.entity';
import { UserComments } from '../comments_user/entities/commets_user.entity';
import { CreateUserCommentsDto } from '../comments_user/dto/create-comments_user.dto';
import { DiscussionComment } from '../comments_discussion/entities/comments_discussion.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comments)
    private readonly commentModel: typeof Comments,
    @InjectModel(UserComments)
    private readonly userCommentsModel: typeof UserComments,
    @InjectModel(DiscussionComment) // Thêm model này
    private readonly discussionCommentModel: typeof DiscussionComment,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comments> {
    return this.commentModel.create(createCommentDto);
  }

  async findOne(id: number): Promise<Comments> {
    const comment = await this.commentModel.findByPk(id);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async createComment(
    createCommentDto: CreateCommentDto,
    userId: number,
    discussionId: number,
  ): Promise<Comments> {
    // Bước 1: Tạo một Comment mới
    const newComment = await this.commentModel.create(createCommentDto);

    // Bước 2: Tạo một bản ghi trong bảng UserComments
    const userCommentData: CreateUserCommentsDto = {
      userId: userId,
      commentId: newComment.id,
    };
    await this.userCommentsModel.create(userCommentData);

    // Bước 3: Lưu vào bảng DiscussionComment
    const discussionCommentData = {
      discussionId: discussionId, // Lấy discussionId từ createCommentDto
      commentId: newComment.id,
    };
    await this.discussionCommentModel.create(discussionCommentData);

    return newComment;
  }
  async updateComment(commentId: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentModel.findByPk(commentId);
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    await comment.update(updateCommentDto);
    return comment;
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id);
    await comment.destroy();
  }
}
