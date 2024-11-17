// create-progress.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsEnum } from 'class-validator';

export class CreateProgressDto {
  @ApiProperty({
    description: 'ID of the user associated with the progress record',
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'ID of the lesson associated with the progress record',
  })
  @IsInt()
  lessonId: number;

  @ApiProperty({
    description: 'Status of lesson completion',
    default: 'not-started',
  })
  @IsEnum(['not-started', 'in-progress', 'completed'])
  status: 'not-started' | 'in-progress' | 'completed';

  @ApiProperty({
    description: 'Last accessed date of the lesson',
    required: false,
  })
  @IsOptional()
  completedAt?: Date;
}
