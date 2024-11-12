import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ChapterService } from './chapter.service';
import { ChapterController } from './chapter.controller';
import { Chapter } from './entities/chapter.entity';

@Module({
  imports: [SequelizeModule.forFeature([Chapter])],
  controllers: [ChapterController],
  providers: [ChapterService],
  exports: [ChapterService]
})
export class ChapterModule { }
