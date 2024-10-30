import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProblemsDto {
  @ApiProperty({ description: 'The title of the Promblem' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @ApiProperty({ description: 'The description of the Promblem' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @ApiProperty({ description: 'The difficulty of the Promblem' })
  @IsNotEmpty({ message: 'Difficulty cannot be empty' })
  difficultyId: number;

  @ApiProperty({ description: 'The courseId of the Promblem' })
  @IsNotEmpty({ message: 'CourseId cannot be empty' })
  courseId: number;
}
