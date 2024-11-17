import { Controller, Post, Body, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/submission.dto';
import { Response } from 'express';

@ApiTags('Submission')
@Controller('submissions')
@ApiBearerAuth('JWT')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) { }

  /**
   * API tạo hoặc cập nhật bài nộp
   */
  @Post(':userId')
  @ApiOperation({ summary: 'Submit exercises by user' })
  async createOrUpdateSubmission(
    @Param('userId') userId: number,
    @Body() createSubmissionDto: CreateSubmissionDto,
    @Res() res: Response,
  ) {
    try {
      // Gọi service để xử lý logic submission
      const result = await this.submissionService.createOrUpdateSubmission(
        userId,
        createSubmissionDto.language,
        createSubmissionDto.problemId,
        createSubmissionDto.code,
        createSubmissionDto.stdin || '',
      );

      const { submission, acceptanceSubmission, message } = result;

      // **1. Nếu bài đã được chấp nhận trước đó**
      if (acceptanceSubmission.status === 'accepted') {
        return res.status(200).json({
          status: 200,
          message: 'Your submission has already been completed and accepted.',
          data: {
            submission,
            acceptanceSubmission,
          },
        });
      }

      // **2. Nếu bài đã hoàn thành nhưng chưa được chấp nhận**
      if (submission.status === 'completed' && acceptanceSubmission.status !== 'accepted') {
        return res.status(202).json({
          status: 202,
          message: 'Submission completed but not accepted.',
          data: {
            submission,
            acceptanceSubmission,
          },
        });
      }

      // **3. Nếu là bài nộp mới**
      return res.status(201).json({
        status: 201,
        message: message || 'Submission processed successfully.',
        data: {
          submission,
          acceptanceSubmission,
        },
      });
    } catch (error) {
      // **4. Trả về lỗi**
      return res.status(400).json({
        status: 400,
        message: 'Submission failed',
        error: error.message,
      });
    }
  }

  /**
   * API chạy mã trực tiếp
   */
  @Post('run/:userId')
  @ApiOperation({ summary: 'Run code directly with input' })
  async runCode(
    @Param('userId') userId: number,
    @Body() createSubmissionDto: CreateSubmissionDto,
    @Res() res: Response, // Sử dụng @Res để kiểm soát phản hồi
  ) {
    try {
      const result = await this.submissionService.runCode(
        createSubmissionDto.language,
        createSubmissionDto.code,
        createSubmissionDto.stdin || '',
      );

      // Trả về kết quả chạy code
      return res.status(200).json({
        message: 'Code executed successfully',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Code execution failed',
        error: error.message,
      });
    }
  }
}
