import { IsEnum, IsOptional } from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProcessDto {
  @ApiProperty({ description: 'The id of the user' })
  userId: number;

  @ApiProperty({ description: 'The exerciseId of the user' })
  exerciseId: number;

  @ApiPropertyOptional({
    description: 'The status of the exercise',
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  })
  @IsEnum(['pending', 'in-progress', 'completed'], {
    message: 'Status must be either pending, in-progress, or completed',
  })
  @IsOptional()
  status: 'pending' | 'in-progress' | 'completed' = 'pending';
}
