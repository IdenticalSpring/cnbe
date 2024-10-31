import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Solutions } from './entities/solution.entity';

import { SolutionService } from './solution.service';
import { SolutionController } from './solution.controller';
import { SolutionComments } from '../solution_comments/entities/solution_comment.entity';
import { SolutionCommentService } from '../solution_comments/solution_comments.service';
import { SolutionCommentController } from '../solution_comments/solution_comments.controller';


@Module({
  imports: [SequelizeModule.forFeature([Solutions, SolutionComments])],
  providers: [SolutionService, SolutionCommentService],
  controllers: [SolutionController, SolutionCommentController],
})
export class SolutionModule { }
