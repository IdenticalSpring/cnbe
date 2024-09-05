import { ApiProperty } from '@nestjs/swagger';

export class CreateEnrollmentsDto {
  @ApiProperty({ description: 'The userId of the user' })
  userId: number;

  @ApiProperty({ description: 'The courseId of the course' })
  courseId: number;
}
