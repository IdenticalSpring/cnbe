// src/topics/topics.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTopicDto } from './dto/create-topics.dto';
import { Topics } from './entities/topics.entities';

@Injectable()
export class TopicsService {
  constructor(
    @InjectModel(Topics)
    private topicsModel: typeof Topics,
  ) {}

  async create(createTopicDto: CreateTopicDto): Promise<Topics> {
    return this.topicsModel.create(createTopicDto);
  }

  async findAll(): Promise<Topics[]> {
    return this.topicsModel.findAll();
  }

  async findOne(id: number): Promise<Topics> {
    return this.topicsModel.findByPk(id);
  }

  async update(
    id: number,
    updateTopicDto: CreateTopicDto,
  ): Promise<[number, Topics[]]> {
    return this.topicsModel.update(updateTopicDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<void> {
    const topic = await this.findOne(id);
    await topic.destroy();
  }
}
