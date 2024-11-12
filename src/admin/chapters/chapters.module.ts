import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chapter } from 'src/models/course_chapter/entities/chapter.entity';
import { Lessons } from 'src/models/course_lesson/entities/course_lesson.entity';
import { AdminChapterController } from './chapters.controller';
import { ChapterService } from 'src/models/course_chapter/chapter.service';
import { CloudinaryService } from 'src/models/cloudinary/cloudinary.service';


@Module({
    imports: [SequelizeModule.forFeature([Chapter, Lessons])],
    controllers: [AdminChapterController],
    providers: [ChapterService, CloudinaryService],
})
export class AdminChapterModule { }
