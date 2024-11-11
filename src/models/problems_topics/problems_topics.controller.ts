// src/problem-topics/problem-topics.controller.ts
import { Controller, Post, Delete, Body, Param, Get } from '@nestjs/common';
import { ProblemTopicsService } from './problems_topics.service';
import { CreateProblemTopicDto } from './dto/problems_topics.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('problem-topics')
@Controller('problem-topics')
@ApiBearerAuth('JWT')
export class ProblemTopicsController {
  constructor(private readonly problemTopicsService: ProblemTopicsService) {}

  @Post()
  async create(@Body() createProblemTopicDto: CreateProblemTopicDto) {
    return this.problemTopicsService.create(createProblemTopicDto);
  }

  @Delete(':problemId/:topicId')
  async remove(
    @Param('problemId') problemId: number,
    @Param('topicId') topicId: number,
  ) {
    return this.problemTopicsService.remove(problemId, topicId);
  }

  @Get(':problemId/topics')
  async getTopicsByProblemId(@Param('problemId') problemId: number) {
    return this.problemTopicsService.findTopicsByProblemId(problemId);
  }
}
