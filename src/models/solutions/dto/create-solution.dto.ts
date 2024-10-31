import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSolutionDto {
    @ApiProperty({ description: 'ID of the related problem', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    readonly problemId: number;

    @ApiProperty({ description: 'ID of the user who submitted the solution', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;

    @ApiProperty({ description: 'Code content of the solution', example: 'function example() { return true; }' })
    @IsNotEmpty()
    @IsString()
    readonly code: string;

    @ApiProperty({ description: 'Programming language of the solution', example: 'JavaScript' })
    @IsNotEmpty()
    @IsString()
    readonly language: string;
}