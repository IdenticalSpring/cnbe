import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCoursesDto {
  @ApiProperty({ description: 'The title of the course' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @ApiProperty({ description: 'The description of the course' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @ApiProperty({ description: 'The image URL of the course', required: false })
  @IsOptional()
  imageUrl?: string;
  
  @ApiProperty({ description: 'The type of the course', required: false })
  @IsOptional()
  types?: number[];
}
