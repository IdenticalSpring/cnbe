// user-vote.controller.ts
import { Controller, Param, Post, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserVoteService } from './user_vote.service';
import { Public } from 'src/decorator/public.decorator';

@Public()
@ApiTags('User Votes')
@Controller('user-votes')
export class UserVoteController {
  constructor(private readonly userVoteService: UserVoteService) {}

  @Post(':userId/:discussionId/upvote')
  @ApiOperation({ summary: 'Upvote a discussion' })
  @ApiResponse({
    status: 200,
    description: 'Successfully upvoted the discussion',
  })
  @ApiResponse({ status: 400, description: 'Error processing upvote' })
  async upvoteDiscussion(
    @Param('userId') userId: number,
    @Param('discussionId') discussionId: number,
  ) {
    try {
      const result = await this.userVoteService.voteOnDiscussion(
        userId,
        discussionId,
        'upvote',
      );
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post(':userId/:discussionId/downvote')
  @ApiOperation({ summary: 'Downvote a discussion' })
  @ApiResponse({
    status: 200,
    description: 'Successfully downvoted the discussion',
  })
  @ApiResponse({ status: 400, description: 'Error processing downvote' })
  async downvoteDiscussion(
    @Param('userId') userId: number,
    @Param('discussionId') discussionId: number,
  ) {
    try {
      const result = await this.userVoteService.voteOnDiscussion(
        userId,
        discussionId,
        'downvote',
      );
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
