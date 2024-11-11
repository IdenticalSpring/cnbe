// discussion-comment.controller.ts
import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { DiscussionCommentService } from './comments_disscussion.service';
import { CreateDiscussionCommentDto } from './dto/comments_discusiion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DiscussionComment } from './entities/comments_discussion.entity';

@ApiTags('discussion-comments')
@ApiBearerAuth('JWT')
@Controller('discussion-comments')
export class DiscussionCommentController {
  constructor(
    private readonly discussionCommentService: DiscussionCommentService,
  ) {}

  @Post()
  create(@Body() createDiscussionCommentDto: CreateDiscussionCommentDto) {
    return this.discussionCommentService.create(createDiscussionCommentDto);
  }

  @Get()
  findAll() {
    return this.discussionCommentService.findAll();
  }

  @Get(':discussionId')
  async findPaginatedComments(
    @Param('discussionId') discussionId: number,
    @Query('page') page: number = 1, // Default page to 1
  ): Promise<{
    data: DiscussionComment[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.discussionCommentService.findPaginatedByDiscussionId(
      discussionId,
      page,
    );
  }
}
