// user-comments.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserCommentsService } from './comments_user.service';
import { CreateUserCommentsDto } from './dto/create-comments_user.dto';
import { UserComments } from './entities/commets_user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user-comments')
@Controller('user-comments')
@ApiBearerAuth('JWT')
export class UserCommentsController {
  constructor(private readonly userCommentsService: UserCommentsService) {}

  @Post()
  async create(
    @Body() createUserCommentsDto: CreateUserCommentsDto,
  ): Promise<UserComments> {
    return this.userCommentsService.create(createUserCommentsDto);
  }

  @Get()
  async findAll(): Promise<UserComments[]> {
    return this.userCommentsService.findAll();
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<UserComments[]> {
    return this.userCommentsService.findByUserId(userId);
  }

  @Get('comment/:commentId')
  async findByCommentId(
    @Param('commentId') commentId: number,
  ): Promise<UserComments[]> {
    return this.userCommentsService.findByCommentId(commentId);
  }
}
