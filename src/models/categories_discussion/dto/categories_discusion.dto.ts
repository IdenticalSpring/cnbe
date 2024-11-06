import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCategoryDiscussionDto {
  @ApiProperty({ description: ' The categoryId is not empty.' })
  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  @ApiProperty({ description: ' The discussionId is not empty.' })
  @IsNotEmpty()
  @IsInt()
  discussionId: number;
}
