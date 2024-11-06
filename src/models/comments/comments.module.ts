import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comments } from './entities/comments.entity';
import { UserComments } from '../comments_user/entities/commets_user.entity';
import { DiscussionComment } from '../comments_discussion/entities/comments_discussion.entity';
import { CommentService } from './comments.service';
import { CommentController } from './comments.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Comments, UserComments, DiscussionComment]), // Đảm bảo có DiscussionComment
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
