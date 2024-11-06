// discussion-comment.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiscussionComment } from './entities/comments_discussion.entity';
import { DiscussionCommentController } from './comments_discussion.controller';
import { DiscussionCommentService } from './comments_disscussion.service';

@Module({
  imports: [SequelizeModule.forFeature([DiscussionComment])],
  controllers: [DiscussionCommentController],
  providers: [DiscussionCommentService],
})
export class DiscussionCommentModule {}
