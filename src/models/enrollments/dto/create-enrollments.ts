import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEnrollmentsDto {
  @ApiProperty({ description: 'The userId of the user' })
  @IsNotEmpty({ message: 'UserId cannot be empty' })
  userId: number;

  @ApiProperty({ description: 'The courseId of the course' })
  @IsNotEmpty({ message: 'CourseId cannot be empty' })
  courseId: number;
}
