// discussion-comment.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DiscussionCommentService } from './comments_disscussion.service';
import { CreateDiscussionCommentDto } from './dto/comments_discusiion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
  findByDiscussionId(@Param('discussionId') discussionId: number) {
    return this.discussionCommentService.findByDiscussionId(discussionId);
  }
}
