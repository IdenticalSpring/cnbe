import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SolutionCommentService } from './solution_comments.service';
import { SolutionCommentController } from './solution_comments.controller';
import { SolutionComments } from './entities/solution_comment.entity';

@Module({
  imports: [SequelizeModule.forFeature([SolutionComments])], 
  providers: [SolutionCommentService],
  controllers: [SolutionCommentController],
  exports: [SolutionCommentService], 
})
export class SolutionCommentsModule { }
