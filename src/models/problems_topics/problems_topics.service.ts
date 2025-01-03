// src/problem-topics/problem-topics.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProblemTopics } from './entities/problems_topics.entities';
import { CreateProblemTopicDto } from './dto/problems_topics.dto';

@Injectable()
export class ProblemTopicsService {
  constructor(
    @InjectModel(ProblemTopics)
    private readonly problemTopicsModel: typeof ProblemTopics,
  ) {}

  async create(
    createProblemTopicDto: CreateProblemTopicDto,
  ): Promise<ProblemTopics> {
    return this.problemTopicsModel.create(createProblemTopicDto);
  }

  async remove(problemId: number, topicId: number): Promise<number> {
    return this.problemTopicsModel.destroy({
      where: { problemId, topicId },
    });
  }
}
