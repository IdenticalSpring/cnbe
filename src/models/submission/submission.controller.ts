import { Controller, Post, Body, Param } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/submission.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Submissions') // Để nhóm các API endpoints liên quan đến submission
@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Submit exercises by user' })
  async createOrUpdateSubmission(
    @Param('userId') userId: number,
    @Body() createSubmissionDto: CreateSubmissionDto,
  ) {
    try {
      const submission = await this.submissionService.createOrUpdateSubmission(
        userId,
        createSubmissionDto.language,
        createSubmissionDto.code,
        createSubmissionDto.stdin || '', // Truyền stdin nếu có, nếu không thì truyền chuỗi rỗng
      );
      return {
        message: 'Submission processed successfully',
        data: submission,
      };
    } catch (error) {
      return {
        message: 'Submission failed',
        error: error.message,
      };
    }
  }
}
