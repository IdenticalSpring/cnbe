import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comments.dto';
import { UpdateCommentDto } from './dto/update-comments.dto';
import { CommentService } from './comments.service';

@ApiTags('Comments')
@Controller('comments')
@ApiBearerAuth('JWT')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':userId')
  async createComment(
    @Param('userId') userId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.createComment(createCommentDto, userId);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  // @Get('discussion/:discussionId')
  // findAllByDiscussion(@Param('discussionId') discussionId: number) {
  //   return this.commentService.findAllByDiscussion(discussionId);
  // }

  @ApiOperation({ summary: 'user edit comment' })
  @Patch(':commentId')
  async updateComment(
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentService.updateComment(commentId, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentService.remove(id);
  }
}
