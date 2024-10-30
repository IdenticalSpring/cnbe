// src/problem-topics/problem-topics.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProblemTopics } from './entities/problems_topics.entities';
import { Problems } from '../problems/entitites/problems.entity';
import { Topics } from '../topics/entities/topics.entities';
import { ProblemTopicsController } from './problems_topics.controller';
import { ProblemTopicsService } from './problems_topics.service';

@Module({
  imports: [SequelizeModule.forFeature([ProblemTopics, Problems, Topics])],
  controllers: [ProblemTopicsController],
  providers: [ProblemTopicsService],
})
export class ProblemTopicsModule {}
