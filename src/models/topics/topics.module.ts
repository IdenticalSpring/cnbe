// src/topics/topics.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { Topics } from './entities/topics.entities';

@Module({
  imports: [SequelizeModule.forFeature([Topics])],
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicsModule {}
