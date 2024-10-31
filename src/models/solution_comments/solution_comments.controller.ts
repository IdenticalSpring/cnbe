import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SolutionCommentService } from './solution_comments.service';
import { CreateSolutionCommentDto } from './dto/create-solution_comment.dto';
import { UpdateSolutionCommentDto } from './dto/update-solution_comment.dto';
import { Public } from 'src/decorator/public.decorator';
@Public()
@ApiTags('Solution Comments')
@Controller('solution-comments')
@ApiBearerAuth('JWT')
export class SolutionCommentController {
  constructor(private readonly solutionCommentService: SolutionCommentService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new comment on a solution' })
  @ApiResponse({ status: 201, description: 'Comment created successfully.' })
  createSolutionComment(@Body() createSolutionCommentDto: CreateSolutionCommentDto) {
    return this.solutionCommentService.createSolutionComment(createSolutionCommentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all comments for solutions' })
  @ApiResponse({ status: 200, description: 'List of comments.' })
  findAllSolutionComments() {
    return this.solutionCommentService.findAllSolutionComments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by ID' })
  @ApiResponse({ status: 200, description: 'Comment data.' })
  findSolutionCommentById(@Param('id') id: number) {
    return this.solutionCommentService.findSolutionCommentById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a comment on a solution' })
  @ApiResponse({ status: 200, description: 'Comment updated successfully.' })
  updateSolutionComment(@Param('id') id: number, @Body() updateSolutionCommentDto: UpdateSolutionCommentDto) {
    return this.solutionCommentService.updateSolutionComment(id, updateSolutionCommentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment on a solution' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully.' })
  deleteSolutionComment(@Param('id') id: number) {
    return this.solutionCommentService.deleteSolutionComment(id);
  }
  @Get('root')
  @ApiOperation({ summary: 'Retrieve root comments (non-replies) with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Successfully retrieved root comments with pagination.' })
  async getRootComments(
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return this.solutionCommentService.findRootComments(page);
  }

  @Get('replies/:commentId')
  @ApiOperation({ summary: 'Retrieve replies for a specific comment with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Successfully retrieved replies with pagination.' })
  async getRepliesForComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return this.solutionCommentService.findRepliesForComment(commentId, page);
  }
}
