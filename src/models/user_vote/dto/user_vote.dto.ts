// src/models/user_vote/dto/create-user-vote.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserVoteDto {
  @ApiProperty({ description: 'The userId not empty' })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'The discussionId not empty' })
  @IsInt()
  @IsNotEmpty()
  discussionId: number;

  @ApiProperty({ description: 'The voteType allow upvote or downvote' })
  @IsEnum(['upvote', 'downvote'])
  voteType: 'upvote' | 'downvote';
}
