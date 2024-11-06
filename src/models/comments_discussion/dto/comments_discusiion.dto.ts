// dto/create-discussion-comment.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateDiscussionCommentDto {
  @ApiProperty({ description: 'The discussionId is not empty.' })
  @IsNotEmpty()
  @IsInt()
  discussionId: number;

  @ApiProperty({ description: 'The commentId is not empty.' })
  @IsNotEmpty()
  @IsInt()
  commentId: number;
}
