import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateSolutionDto {
    @ApiPropertyOptional({ description: 'Updated code content', example: 'function updatedExample() { return false; }' })
    @IsOptional()
    @IsString()
    readonly code?: string;

    @ApiPropertyOptional({ description: 'Updated programming language', example: 'TypeScript' })
    @IsOptional()
    @IsString()
    readonly language?: string;

    @ApiPropertyOptional({ description: 'Updated status of the solution', example: 'accepted' })
    @IsOptional()
    @IsString()
    readonly status?: string;

    @ApiPropertyOptional({ description: 'Number of likes', example: 10 })
    @IsOptional()
    @IsNumber()
    readonly likes?: number;

    @ApiPropertyOptional({ description: 'Number of dislikes', example: 2 })
    @IsOptional()
    @IsNumber()
    readonly dislikes?: number;
}