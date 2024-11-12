// src/problem-topics/problem-topics.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProblemTopics } from './entities/problems_topics.entities';
import { CreateProblemTopicDto } from './dto/problems_topics.dto';
import { Topics } from '../topics/entities/topics.entities';

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

  // New method to find topics by problem ID
  async findTopicsByProblemId(problemId: number): Promise<ProblemTopics[]> {
    return this.problemTopicsModel.findAll({
      where: { problemId },
      include: [
        {
          model: Topics, // Bao gồm bảng Topic
          attributes: ['id', 'name'], // Các trường cần lấy từ bảng Topic
        },
      ],
    });
  }
}
