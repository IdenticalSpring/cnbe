import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, Max, Min } from 'class-validator';

export class UpdateUserChapterProgressDto {
  @ApiProperty()
  @IsOptional()
  @Min(0)
  @Max(100)
  progress?: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(['not-started', 'in-progress', 'completed'])
  status?: 'not-started' | 'in-progress' | 'completed';
}
