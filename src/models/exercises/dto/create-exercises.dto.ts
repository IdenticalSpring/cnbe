import { ApiProperty } from '@nestjs/swagger';

export class CreateExercisesDto {
  @ApiProperty({ description: 'The title of the course' })
  title: string;

  @ApiProperty({ description: 'The description of the course' })
  description: string;

  @ApiProperty({ description: 'The difficulty of the course' })
  difficulty: string;

  @ApiProperty({ description: 'The courseId of the course' })
  courseId: number;
}
