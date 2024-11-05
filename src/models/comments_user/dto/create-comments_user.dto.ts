// create-user-comments.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateUserCommentsDto {
  @ApiProperty({ description: 'The userId of the usercomment' })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({ description: 'The commentId of the usercomment' })
  @IsNotEmpty()
  @IsInt()
  commentId: number;
}
