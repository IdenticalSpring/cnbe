import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TagDiscussion } from './entities/tag_discussion.entity';
import { TagDiscussionService } from './tag_discussion.service';
import { TagDiscussionController } from './tag_discussion.controller';

@Module({
  imports: [SequelizeModule.forFeature([TagDiscussion])],
  providers: [TagDiscussionService],
  controllers: [TagDiscussionController],
})
export class TagDiscussionModule {}
