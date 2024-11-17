import { Controller, Post, Param, Get, Query } from '@nestjs/common';
import { TagDiscussionService } from './tag_discussion.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TagDiscussion } from './entities/tag_discussion.entity';

@Controller('tag-discussion')
@ApiTags('tag-discussion')
@ApiBearerAuth('JWT')
export class TagDiscussionController {
  constructor(private readonly tagDiscussionService: TagDiscussionService) {}

  @Post(':tagId/discussion/:discussionId')
  create(
    @Param('tagId') tagId: number,
    @Param('discussionId') discussionId: number,
  ) {
    return this.tagDiscussionService.create(tagId, discussionId);
  }

  // Lọc và phân trang dữ liệu
  @Get()
  async findAll(
    @Query('tagId') tagId?: number,
    @Query('page') page: number = 1,
  ) {
    const filter = {
      ...(tagId && { tagId: Number(tagId) }),
    };
    return this.tagDiscussionService.findAll(filter, Number(page));
  }
}
