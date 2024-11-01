import { Controller, Get, Post, Body, Param, Put, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SolutionCommentService } from './solution_comments.service';
import { CreateSolutionCommentDto } from './dto/create-solution_comment.dto';
import { UpdateSolutionCommentDto } from './dto/update-solution_comment.dto';
import { Public } from 'src/decorator/public.decorator';

@Public()
@ApiTags('Solution Feedback')
@Controller('solution-feedback')
@ApiBearerAuth('JWT')
export class SolutionFeedbackController {
  constructor(private readonly solutionCommentService: SolutionCommentService) { }

  @Post(`create`)
  @ApiOperation({ summary: 'Create new feedback on a solution' })
  @ApiResponse({ status: 201, description: 'Feedback created successfully.' })
  createFeedback(@Body() createSolutionCommentDto: CreateSolutionCommentDto) {
    return this.solutionCommentService.createSolutionComment(createSolutionCommentDto);
  }

  @Get('listAll')
  @ApiOperation({ summary: 'Get all feedback for solutions' })
  @ApiResponse({ status: 200, description: 'List of feedback.' })
  findAllFeedback() {
    return this.solutionCommentService.findAllSolutionComments();
  }

  @Get('findID:feedbackId')
  @ApiOperation({ summary: 'Get feedback by ID' })
  @ApiResponse({ status: 200, description: 'Feedback data.' })
  getFeedbackById(@Param('feedbackId', ParseIntPipe) feedbackId: number) {
    return this.solutionCommentService.findSolutionCommentById(feedbackId);
  }

  @Put('update:feedbackId')
  @ApiOperation({ summary: 'Update feedback on a solution' })
  @ApiResponse({ status: 200, description: 'Feedback updated successfully.' })
  updateFeedback(@Param('feedbackId', ParseIntPipe) feedbackId: number, @Body() updateSolutionCommentDto: UpdateSolutionCommentDto) {
    return this.solutionCommentService.updateSolutionComment(feedbackId, updateSolutionCommentDto);
  }

  @Delete('delete:feedbackId')
  @ApiOperation({ summary: 'Delete feedback on a solution' })
  @ApiResponse({ status: 200, description: 'Feedback deleted successfully.' })
  deleteFeedback(@Param('feedbackId', ParseIntPipe) feedbackId: number) {
    return this.solutionCommentService.deleteSolutionComment(feedbackId);
  }

  @Get('main')
  @ApiOperation({ summary: 'Retrieve main feedback (non-replies) with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Successfully retrieved main feedback with pagination.' })
  async getMainFeedback(
    @Query('page') page: string = '1', 
  ) {
    const pageNumber = !isNaN(Number(page)) && Number(page) > 0 ? parseInt(page, 10) : 1; 
    console.log(`API /solution-feedback/main called with page: ${pageNumber}`);
    return this.solutionCommentService.findRootComments(pageNumber);
  }

  @Get('responses/:feedbackId')
  @ApiOperation({ summary: 'Retrieve responses for a specific feedback with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Successfully retrieved responses with pagination.' })
  async getResponsesForFeedback(
    @Param('feedbackId', ParseIntPipe) feedbackId: number,
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return this.solutionCommentService.findRepliesForComment(feedbackId, page);
  }
}
