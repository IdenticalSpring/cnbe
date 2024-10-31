import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateSolutionCommentDto {
    @ApiProperty({ description: 'ID of the related solution', example: 1 })
    @IsInt({ message: 'solutionId must be an integer' })
    readonly solutionId: number;

    @ApiProperty({ description: 'ID of the user who made the comment', example: 1 })
    @IsInt({ message: 'userId must be an integer' })
    readonly userId: number;

    @ApiProperty({ description: 'Content of the comment', example: 'This is a comment.' })
    @IsString({ message: 'comment must be a string' })
    @IsNotEmpty({ message: 'comment should not be empty' })
    readonly comment: string;

    @ApiProperty({ description: 'Whether the comment is a reply', example: false })
    @IsBoolean({ message: 'isReplied must be a boolean' })
    readonly isReplied: boolean;

    @ApiPropertyOptional({ description: 'ID of the comment being replied to', example: 2 })
    @IsInt({ message: 'repliedToCommentId must be an integer' })
    @IsOptional()
    readonly repliedToCommentId?: number;
}
