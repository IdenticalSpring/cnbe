// tag.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './entities/tags.entity';
import { TagController } from './tags.controller';
import { TagService } from './tags.service';

@Module({
  imports: [SequelizeModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
