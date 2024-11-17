import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { Submission } from './entities/submission.model';
import { AcceptanceSubmission } from '../acceptance_submissions/entities/acceptance_submissions.entity';
import Bottleneck from 'bottleneck';

@Injectable()
export class SubmissionService {
  private limiter: Bottleneck;

  constructor(
    @InjectModel(Submission)
    private readonly submissionModel: typeof Submission,
    @InjectModel(AcceptanceSubmission)
    private readonly acceptanceSubmissionModel: typeof AcceptanceSubmission,
  ) {
    this.limiter = new Bottleneck({
      maxConcurrent: 1,
      minTime: 1000,
    });
  }

  /**
   * Map ngôn ngữ lập trình với phiên bản
   */
  private mapLanguageToVersion(language: string): {
    language: string;
    version: string;
  } {
    const languageMap = {
      python: { language: 'python', version: '3.10.0' },
      javascript: { language: 'javascript', version: '16.3.0' },
      c: { language: 'c', version: '10.2.0' },
      java: { language: 'java', version: '15.0.2' },
      cpp: { language: 'cpp', version: '10.2.0' },
    };
    return languageMap[language.toLowerCase()] || null;
  }

  /**
   * Tạo hoặc cập nhật submission
   */
  async createOrUpdateSubmission(
    userId: number,
    language: string,
    problemId: number,
    code: string,
    stdinInput: string,
  ) {
    // Tìm bài nộp cũ dựa trên userId và problemId
    let submission = await this.submissionModel.findOne({
      where: { userId, problemId },
    });

    let acceptanceSubmission: AcceptanceSubmission;

    if (submission) {
      // Tìm AcceptanceSubmission liên quan đến Submission
      acceptanceSubmission = await this.acceptanceSubmissionModel.findOne({
        where: { submissionId: submission.id },
      });

      // Kiểm tra nếu Submission đã hoàn thành và được chấp nhận
      if (
        submission.status === 'completed' &&
        acceptanceSubmission?.status === 'accepted'
      ) {
        return {
          message: 'Your submission has already been completed and accepted.',
          submission,
          acceptanceSubmission,
        };
      }

      // Kiểm tra nếu Submission đã hoàn thành nhưng chưa được chấp nhận
      if (submission.status === 'completed') {
        return {
          message: 'Your submission has already been completed but not accepted.',
          submission,
          acceptanceSubmission,
        };
      }

      // Cập nhật thông tin bài nộp nếu bài cũ chưa hoàn thành
      submission.language = language;
      submission.code = code;
      submission.status = 'pending';
      await submission.save();

      if (acceptanceSubmission) {
        acceptanceSubmission.language = language;
        acceptanceSubmission.code = code;
        acceptanceSubmission.status = 'pending';
        await acceptanceSubmission.save();
      } else {
        // Nếu không tồn tại AcceptanceSubmission, tạo mới
        acceptanceSubmission = await this.acceptanceSubmissionModel.create({
          userId,
          submissionId: submission.id,
          language,
          code,
          status: 'pending',
        });
      }
    } else {
      // Nếu không có Submission, tạo mới
      submission = await this.submissionModel.create({
        userId,
        problemId,
        language,
        code,
        status: 'pending',
      });

      acceptanceSubmission = await this.acceptanceSubmissionModel.create({
        userId,
        submissionId: submission.id,
        language,
        code,
        status: 'pending',
      });
    }

    // Kiểm tra ngôn ngữ có được hỗ trợ không
    const mappedLanguage = this.mapLanguageToVersion(language);

    if (!mappedLanguage) {
      submission.status = 'failed';
      submission.error = 'Unsupported language';
      await submission.save();

      acceptanceSubmission.status = 'rejected';
      await acceptanceSubmission.save();

      return {
        message: 'Unsupported language. Submission rejected.',
        submission,
        acceptanceSubmission,
      };
    }

    // Gọi API để chạy code
    const pistonOptions = {
      method: 'POST',
      url: 'http://judge0.codmaster.id.vn/api/v2/execute',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        language: mappedLanguage.language,
        version: mappedLanguage.version,
        files: [
          {
            name: 'main',
            content: code,
          },
        ],
        stdin: stdinInput || '',
      },
    };

    try {
      const response = await axios(pistonOptions);
      const { run } = response.data;

      submission.status = run && !run.stderr && run.code === 0 ? 'completed' : 'failed';
      submission.output = run?.stdout || null;
      submission.error = run?.stderr || 'Unknown error occurred';
      await submission.save();

      // Cập nhật trạng thái của AcceptanceSubmission
      acceptanceSubmission.status =
        submission.status === 'completed' ? 'accepted' : 'rejected';
      acceptanceSubmission.output = submission.output;
      acceptanceSubmission.error = submission.error;
      await acceptanceSubmission.save();

      return {
        message:
          acceptanceSubmission.status === 'accepted'
            ? 'Your submission has been accepted.'
            : 'Your submission was rejected.',
        submission,
        acceptanceSubmission,
      };
    } catch (error) {
      // Xử lý lỗi từ API Piston
      submission.status = 'failed';
      submission.output = null;
      submission.error = 'Piston API Error: ' + error.message;
      await submission.save();

      acceptanceSubmission.status = 'rejected';
      acceptanceSubmission.output = null;
      acceptanceSubmission.error = submission.error;
      await acceptanceSubmission.save();

      return {
        message: 'Submission failed due to a system error.',
        error: error.message,
        submission,
        acceptanceSubmission,
      };
    }
  }



  /**
   * Chạy mã nguồn trực tiếp
   */
  async runCode(language: string, code: string, stdinInput: string) {
    const mappedLanguage = this.mapLanguageToVersion(language);

    if (!mappedLanguage) {
      throw new Error('Unsupported language');
    }

    const pistonOptions = {
      method: 'POST',
      url: 'http://judge0.codmaster.id.vn/api/v2/execute',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        language: mappedLanguage.language,
        version: mappedLanguage.version,
        files: [
          {
            name: 'main',
            content: code,
          },
        ],
        stdin: stdinInput || '',
      },
    };

    try {
      const response = await axios(pistonOptions);
      const { run } = response.data;

      if (!run) {
        return {
          status: 'failed',
          output: null,
          error: 'No run data returned from API.',
        };
      }

      const status = run.stderr || run.code !== 0 ? 'failed' : 'completed';

      return {
        status,
        output: run.stdout,
        error: run.stderr || null,
        cpu_time: run.cpu_time,
        memory: run.memory,
        wall_time: run.wall_time,
      };
    } catch (error) {
      return {
        status: 'failed',
        output: null,
        error: 'Piston API Error: ' + error.message,
      };
    }
  }
}
