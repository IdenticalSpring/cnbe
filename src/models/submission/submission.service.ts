import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { Submission } from './entities/submission.model';
import { AcceptanceSubmission } from '../acceptance_submissions/entities/acceptance_submissions.entity';
import { CreateSubmissionDto } from './dto/submission.dto';
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

  public mapLanguageToVersion(language: string): {
    language: string;
    version: string;
  } {
    const languageMap = {
      python: { language: 'python', version: '3.10.0' },
      javascript: { language: 'javascript', version: '18.15.0' },
      c: { language: 'c', version: '10.2.0' },
      csharp: { language: 'csharp.net', version: '5.0.201' },
      java: { language: 'java', version: '15.0.2' },
      typescript: { language: 'typescript', version: '5.0.3' },
      cpp: { language: 'cpp', version: '10.2.0' },
    };
    return languageMap[language.toLowerCase()] || null;
  }

  async createOrUpdateSubmission(
    userId: number,
    language: string,
    problemId: number,
    code: string,
    stdinInput: string,
  ) {
    let submission = await this.submissionModel.findOne({
      where: { userId, language },
    });

    if (!submission) {
      submission = await this.submissionModel.create({
        userId,
        problemId,
        language,
        code,
        status: 'failed',
      });
    } else {
      submission.code = code;
      submission.status = 'failed';
      await submission.save();
    }

    // Tạo acceptance_submission mới
    const acceptanceSubmission = await AcceptanceSubmission.create({
      userId: userId,
      submissionId: submission.id,
      language: language,
      code: code,
      status: 'pending',
    });

    const mappedLanguage = this.mapLanguageToVersion(language);

    if (!mappedLanguage) {
      throw new Error('Unsupported language');
    }

    const pistonOptions = {
      method: 'POST',
      url: 'https://emkc.org/api/v2/piston/execute',
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
      const output = response.data.run.stdout;
      const error = response.data.run.stderr;

      if (error) {
        submission.status = 'failed';
        submission.output = null;
        submission.error = error;
      } else if (output) {
        submission.status = 'completed';
        submission.output = output;
        submission.error = null;
      }

      await submission.save();
      return { submission, acceptanceSubmission };
    } catch (error) {
      submission.status = 'failed';
      submission.output = null;
      submission.error = 'Piston API Error: ' + error.message;
      await submission.save();

      throw new Error('Piston API Error: ' + error.message);
    }
  }
}
