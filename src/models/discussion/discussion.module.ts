import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Discussions } from './entities/discussion.entity';
import { User } from '../users/entities/user.entity';
import { DiscussService } from './discussion.service';
import { DiscussController } from './discussion.controller';
import { UserDiscussion } from '../user_discussion/entities/user_discussion.entity';

@Module({
  imports: [SequelizeModule.forFeature([Discussions, User, UserDiscussion])],
  providers: [DiscussService],
  controllers: [DiscussController],
})
export class DiscussModule {}
