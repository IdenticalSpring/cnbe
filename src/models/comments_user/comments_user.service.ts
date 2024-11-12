// user-comments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserComments } from './entities/commets_user.entity';
import { CreateUserCommentsDto } from './dto/create-comments_user.dto';
import { Comments } from '../comments/entities/comments.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class UserCommentsService {
  constructor(
    @InjectModel(UserComments)
    private readonly userCommentsModel: typeof UserComments,
  ) {}

  async create(
    createUserCommentsDto: CreateUserCommentsDto,
  ): Promise<UserComments> {
    return this.userCommentsModel.create(createUserCommentsDto);
  }

  async findAll(): Promise<UserComments[]> {
    return this.userCommentsModel.findAll({
      include: [
        { model: User, attributes: ['id', 'name'] },
        { model: Comments, attributes: ['id', 'content'] },
      ],
    });
  }

  async findByUserId(userId: number): Promise<UserComments[]> {
    return this.userCommentsModel.findAll({
      where: { userId },
      include: { model: Comments, attributes: ['id', 'content'] },
    });
  }

  async findByCommentId(commentId: number): Promise<UserComments[]> {
    return this.userCommentsModel.findAll({
      where: { commentId },
      include: { model: User, attributes: ['id', 'name'] },
    });
  }
}
