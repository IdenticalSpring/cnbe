import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryDiscussion } from './entities/categories_discussion';
import { CategoryDiscussionController } from './categories_discussion.controller';
import { CategoryDiscussionService } from './categories_discussion.service';

@Module({
  imports: [SequelizeModule.forFeature([CategoryDiscussion])],
  controllers: [CategoryDiscussionController],
  providers: [CategoryDiscussionService],
})
export class CategoryDiscussionModule {}
