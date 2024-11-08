import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProblemsDto {
  @ApiProperty({ description: 'The title of the Problem' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @ApiProperty({ description: 'The description of the Problem' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @ApiProperty({ description: 'The difficulty of the Problem' })
  @IsNotEmpty({ message: 'Difficulty cannot be empty' })
  difficultyId: number;

  @ApiProperty({ description: 'The courseId of the Problem' })
  @IsNotEmpty({ message: 'CourseId cannot be empty' })
  courseId: number;

  // New fields
  @ApiProperty({ description: 'The number of likes', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Like count cannot be negative' })
  likes: number;

  @ApiProperty({ description: 'The number of dislikes', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Dislike count cannot be negative' })
  dislikes: number;

  @ApiProperty({ description: 'The rating of the Problem', default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Rating cannot be negative' })
  rating: number;

  @ApiProperty({
    description: 'The acceptance rate of the Problem',
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Acceptance rate cannot be negative' })
  acceptance_rate: number;
}
