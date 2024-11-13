import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: 'The content of the comment' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ description: 'The replies from comment (Id comment)' })
  @IsOptional()
  @IsNumber()
  parentId?: number;
}
