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
    // Kiểm tra hoặc tạo submission mới
    const submission = await this.submissionModel.findOrCreate({
      where: { userId, language },
      defaults: {
        userId,
        problemId,
        language,
        code,
        status: 'pending',
      },
    }).then(([submissionInstance]) => submissionInstance);

    submission.code = code;
    submission.status = 'pending';
    await submission.save();

    // Tạo acceptance submission
    await this.acceptanceSubmissionModel.create({
      userId,
      submissionId: submission.id,
      language,
      code,
      status: 'pending',
    });

    const mappedLanguage = this.mapLanguageToVersion(language);

    if (!mappedLanguage) {
      submission.status = 'failed';
      submission.error = 'Unsupported language';
      await submission.save();
      throw new Error('Unsupported language');
    }

    // Cấu hình API Piston
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

      // Xử lý kết quả
      submission.status = run ? (run.stderr || run.code !== 0 ? 'failed' : 'completed') : 'failed';
      submission.output = run?.stdout || null;
      submission.error = run?.stderr || 'Unknown error occurred';
      await submission.save();

      return {
        submission,
        acceptanceSubmission: {
          userId,
          submissionId: submission.id,
          status: submission.status,
        },
      };
    } catch (error) {
      submission.status = 'failed';
      submission.output = null;
      submission.error = 'Piston API Error: ' + error.message;
      await submission.save();

      throw new Error('Piston API Error: ' + error.message);
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
