import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsEnum, IsOptional, Min, Max } from 'class-validator';

export class CreateUserChapterProgressDto {
  @ApiProperty({ description: 'The userId of the progress' })
  @IsInt()
  userId: number;

  @ApiProperty({ description: 'The chapterId of the userId in progress' })
  @IsInt()
  chapterId: number;

  @ApiProperty({ description: 'The percentage of the userId in progress' })
  @Min(0)
  @Max(100)
  progress: number; // Tiến trình từ 0 đến 100%

  @IsEnum(['not-started', 'in-progress', 'completed'])
  status: 'not-started' | 'in-progress' | 'completed';
}
