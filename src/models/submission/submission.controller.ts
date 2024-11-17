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
      const { submission, acceptanceSubmission } =
        await this.submissionService.createOrUpdateSubmission(
          userId,
          createSubmissionDto.language,
          createSubmissionDto.problemId,
          createSubmissionDto.code,
          createSubmissionDto.stdin || '',
        );

      return {
        message: 'Submission processed successfully',
        data: {
          submission,
          acceptanceSubmission,
        },
      };
    } catch (error) {
      return {
        message: 'Submission failed',
        error: error.message,
      };
    }
  }

  @Post('run/:userId')
  @ApiOperation({ summary: 'Run code directly with input' })
  async runCode(
    @Param('userId') userId: number,
    @Body() createSubmissionDto: CreateSubmissionDto,
  ) {
    try {
      // Gọi service để chạy code, truyền vào tất cả các trường cần thiết từ DTO
      const result = await this.submissionService.runCode(
        createSubmissionDto.language,
        createSubmissionDto.code,
        createSubmissionDto.stdin || '',
      );

      // Trả về kết quả
      return {
        message: 'Code executed successfully',
        data: result,
      };
    } catch (error) {
      // Xử lý lỗi nếu có
      return {
        message: 'Code execution failed',
        error: error.message,
      };
    }
  }

}
