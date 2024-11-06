// dto/update-comment.dto.ts
import { ApiProperty } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ description: 'The content of the comment' })
  @IsOptional()
  @IsString()
  content?: string;
}
