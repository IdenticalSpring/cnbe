import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserDiscussion } from './entities/user_discussion.entity';
import { UserDiscussionController } from './user_discussion.controller';
import { UserDiscussionService } from './user_discussion.service';

@Module({
  imports: [SequelizeModule.forFeature([UserDiscussion])],
  controllers: [UserDiscussionController],
  providers: [UserDiscussionService],
  exports: [UserDiscussionService], // Nếu cần xuất ra cho các module khác
})
export class UserDiscussionModule {}
