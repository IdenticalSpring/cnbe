import { Controller, Post, Param } from '@nestjs/common';
import { TagDiscussionService } from './tag_discussion.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
}
