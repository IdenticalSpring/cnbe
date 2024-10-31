import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSolutionCommentDto {
    @ApiProperty({ description: 'ID of the related solution', example: 1 })
    readonly solutionId: number;

    @ApiProperty({ description: 'ID of the user who made the comment', example: 1 })
    readonly userId: number;

    @ApiProperty({ description: 'Content of the comment', example: 'This is a comment.' })
    readonly comment: string;

    @ApiProperty({ description: 'Whether the comment is a reply', example: false })
    readonly isReplied: boolean;

    @ApiPropertyOptional({ description: 'ID of the comment being replied to', example: 2 })
    readonly repliedToCommentId?: number;
}
