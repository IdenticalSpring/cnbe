// create-progress.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateProgressDto {
    @ApiProperty({ description: 'ID of the user associated with the progress record' })
    @IsInt()
    userId: number;

    @ApiProperty({ description: 'ID of the lesson associated with the progress record' })
    @IsInt()
    lessonId: number;

    @ApiProperty({ description: 'Status of lesson completion', default: false })
    @IsBoolean()
    @IsOptional()
    completed?: boolean;

    @ApiProperty({ description: 'Last accessed date of the lesson', required: false })
    @IsOptional()
    lastAccessed?: Date;
}
