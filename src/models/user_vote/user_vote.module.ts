// user-vote.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserVote } from './entities/user_vote.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Discussions } from 'src/models/discussion/entities/discussion.entity';
import { UserVoteController } from './user_vote.controller';
import { UserVoteService } from './user_vote.service';

@Module({
  imports: [SequelizeModule.forFeature([UserVote, User, Discussions])],
  controllers: [UserVoteController],
  providers: [UserVoteService],
})
export class UserVoteModule {}
