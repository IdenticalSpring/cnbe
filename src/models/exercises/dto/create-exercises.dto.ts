import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateExercisesDto {
  @ApiProperty({ description: 'The title of the course' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @ApiProperty({ description: 'The description of the course' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @ApiProperty({ description: 'The difficulty of the course' })
  @IsNotEmpty({ message: 'Difficulty cannot be empty' })
  difficulty: string;

  @ApiProperty({ description: 'The courseId of the course' })
  @IsNotEmpty({ message: 'CourseId cannot be empty' })
  courseId: number;
}
