// src/problem-topics/dto/create-problem-topic.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateProblemTopicDto {
  @ApiProperty({ description: 'The ID of the problem' })
  @IsNotEmpty()
  @IsInt()
  problemId: number;

  @ApiProperty({ description: 'The ID of the topic' })
  @IsNotEmpty()
  @IsInt()
  topicId: number;
}
