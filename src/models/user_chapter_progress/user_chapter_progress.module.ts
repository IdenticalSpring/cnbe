import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserChapterProgressService } from './user_chapter_progress.service';
import { UserChapterProgressController } from './user_chapter_progress.controller';
import { UserChapterProgress } from './entities/user_chapter_progress.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserChapterProgress])],
  controllers: [UserChapterProgressController],
  providers: [UserChapterProgressService],
})
export class UserChapterProgressModule {}
