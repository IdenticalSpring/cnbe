import { Controller, Post, Body, Param, Res, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/submission.dto';
import { Response } from 'express';
import axios from 'axios';

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
      const result = await this.submissionService.createOrUpdateSubmission(
        userId,
        createSubmissionDto.language,
        createSubmissionDto.problemId,
        createSubmissionDto.code,
        createSubmissionDto.stdin || '',
      );

      const { submission, acceptanceSubmission, message, status } = result;

      if (status === 200) {
        // **Đã được chấp nhận trước đó**
        return res.status(200).json({
          status: 200,
          message: 'Your submission has already been completed and accepted.',
          data: {
            submission,
            acceptanceSubmission,
          },
        });
      }

      if (status === 201) {
        // **Nộp bài mới hoặc cập nhật bài cũ thành công**
        return res.status(201).json({
          status: 201,
          message: message || 'Submission processed successfully.',
          data: {
            submission,
            acceptanceSubmission,
          },
        });
      }

      if (status === 400) {
        // **Lỗi do người dùng (ngôn ngữ không được hỗ trợ hoặc lỗi cú pháp)**
        return res.status(400).json({
          status: 400,
          message: message || 'Submission rejected.',
          data: {
            submission,
            acceptanceSubmission,
          },
        });
      }

      // **Lỗi hệ thống**
      return res.status(500).json({
        status: 500,
        message: 'System error occurred during submission processing.',
        error: result.error || 'Unexpected system error.',
      });
    } catch (error) {
      // **Xử lý lỗi không mong đợi**
      return res.status(500).json({
        status: 500,
        message: 'An unexpected error occurred.',
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
  @Get('/check-connection')
  async checkConnection() {
    try {
      const response = await axios.get('https://judge0.codmaster.id.vn');
      return { status: 'success', data: response.data };
    } catch (error) {
      return { status: 'failed', message: error.message };
    }
  }
  @Get(':userId')
  @ApiOperation({ summary: 'Get submission by userId and optional problemId' })
  @ApiQuery({
    name: 'problemId',
    required: false, 
    description: 'Optional problemId to filter submissions',
    type: Number,
  })
  async getSubmissionByUserIdAndProblemId(
    @Param('userId') userId: number,
    @Query('problemId') problemId?: number,
  ) {
    try {
      const submission = await this.submissionService.getSubmissionByUserIdAndProblemId(
        userId,
        problemId,
      );

      if (!submission) {
        return {
          status: 404,
          message: 'Submission not found.',
        };
      }

      return {
        status: 200,
        message: 'Submission retrieved successfully.',
        data: submission,
      };
    } catch (error) {
      return {
        status: 500,
        message: 'An unexpected error occurred.',
        error: error.message,
      };
    }
  }
}
