// user-comments.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserComments } from './entities/commets_user.entity';
import { UserCommentsService } from './comments_user.service';
import { User } from '../users/entities/user.entity';
import { Comments } from '../comments/entities/comments.entity';
import { UserCommentsController } from './comments_user.controller';

@Module({
  imports: [SequelizeModule.forFeature([UserComments, User, Comments])],
  providers: [UserCommentsService],
  controllers: [UserCommentsController],
})
export class UserCommentsModule {}
