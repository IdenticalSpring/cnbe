import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSolutionCommentDto {
    @ApiPropertyOptional({ description: 'Updated content of the comment', example: 'Updated comment.' })
    readonly comment?: string;

    @ApiPropertyOptional({ description: 'Whether the comment is a reply', example: true })
    readonly isReplied?: boolean;

    @ApiPropertyOptional({ description: 'ID of the comment being replied to', example: 2 })
    readonly repliedToCommentId?: number;
}
