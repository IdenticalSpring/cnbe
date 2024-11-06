// user-comments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserComments } from './entities/commets_user.entity';
import { CreateUserCommentsDto } from './dto/create-comments_user.dto';

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
    return this.userCommentsModel.findAll();
  }

  async findByUserId(userId: number): Promise<UserComments[]> {
    return this.userCommentsModel.findAll({ where: { userId } });
  }

  async findByCommentId(commentId: number): Promise<UserComments[]> {
    return this.userCommentsModel.findAll({ where: { commentId } });
  }
}
