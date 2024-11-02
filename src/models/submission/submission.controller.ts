import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/submission.dto';

@ApiTags('Submission')
@Controller('submissions')
@ApiBearerAuth('JWT')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}
  @Post(':userId')
  @ApiOperation({ summary: 'Submit exercises by user' })
  async createOrUpdateSubmission(
    @Param('userId') userId: number,
    @Body() createSubmissionDto: CreateSubmissionDto,
  ) {
    try {
      // Gọi service để tạo submission và acceptance_submission
      const { submission, acceptanceSubmission } =
        await this.submissionService.createOrUpdateSubmission(
          userId,
          createSubmissionDto.language,
          createSubmissionDto.problemId,
          createSubmissionDto.code,
          createSubmissionDto.stdin || '', // Truyền stdin nếu có, nếu không thì truyền chuỗi rỗng
        );

      return {
        message: 'Submission processed successfully',
        data: {
          submission,
          acceptanceSubmission, // Trả về acceptance_submission vừa tạo
        },
      };
    } catch (error) {
      return {
        message: 'Submission failed',
        error: error.message,
      };
    }
  }
}
