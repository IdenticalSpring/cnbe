import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SolutionCommentService } from './solution_comments.service';

import { SolutionComments } from './entities/solution_comment.entity';
import { SolutionFeedbackController } from './solution_comments.controller';

@Module({
  imports: [SequelizeModule.forFeature([SolutionComments])], 
  providers: [SolutionCommentService],
  controllers: [SolutionFeedbackController],
  exports: [SolutionCommentService], 
})
export class SolutionCommentsModule { }
