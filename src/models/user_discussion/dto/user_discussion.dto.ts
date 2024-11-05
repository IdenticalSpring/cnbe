import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserDiscussionDto {
  @ApiProperty({ description: 'The userID not empty' })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'The discussionId not empty' })
  @IsInt()
  @IsNotEmpty()
  discussionId: number;
}
