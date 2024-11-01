import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateSolutionCommentDto {
    @ApiPropertyOptional({ description: 'Updated content of the comment', example: 'Updated comment.' })
    @IsString({ message: 'comment must be a string' })
    @IsNotEmpty({ message: 'comment should not be empty' })
    @IsOptional()
    readonly comment?: string;

    @ApiPropertyOptional({ description: 'Whether the comment is a reply', example: true })
    @IsBoolean({ message: 'isReplied must be a boolean' })
    @IsOptional()
    readonly isReplied?: boolean;

    @ApiPropertyOptional({ description: 'ID of the comment being replied to', example: 2 })
    @IsInt({ message: 'repliedToCommentId must be an integer' })
    @IsOptional()
    readonly repliedToCommentId?: number;
}
