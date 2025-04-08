import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Submission } from './entities/submission.model';
import { AcceptanceSubmission } from '../acceptance_submissions/entities/acceptance_submissions.entity';
import { Problems } from '../problems/entitites/problems.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission)
    private readonly submissionModel: typeof Submission,
    @InjectModel(AcceptanceSubmission)
    private readonly acceptanceSubmissionModel: typeof AcceptanceSubmission,
  ) {}

 
  private mapLanguageToVersion(language: string): {
    language: string;
    version: string;
  } {
    const languageMap = {
      python: { language: 'python', version: '3.10.0' },
      javascript: { language: 'javascript', version: '16.3.0' },
      c: { language: 'c', version: '10.2.0' },
    };
    return languageMap[language.toLowerCase()] || null;
  }


  private async executeCodeDirectly(
    language: string,
    code: string,
    stdinInput?: string,
  ): Promise<{ status: string; output: string | null; error: string | null }> {
    const mappedLanguage = this.mapLanguageToVersion(language);

    if (!mappedLanguage) {
      return {
        status: 'failed',
        output: null,
        error: 'Unsupported language',
      };
    }

    const { spawn } = require('child_process');

    try {
      let command: string;
      let args: string[] = [];

      
      if (mappedLanguage.language === 'python') {
        command = 'python';
        args = ['-c', code]; 
      } else if (mappedLanguage.language === 'javascript') {
        command = 'node';
        args = ['-e', code]; 
      } else {
        return {
          status: 'failed',
          output: null,
          error: `Unsupported language for direct execution: ${mappedLanguage.language}`,
        };
      }

      const process = spawn(command, args);

      if (stdinInput) {
        process.stdin.write(stdinInput);
      }
      process.stdin.end();

      let stdout = '';
      let stderr = '';

      process.stdout.on('data', (data) => {
        stdout += data;
      });

      process.stderr.on('data', (data) => {
        stderr += data;
      });

      return new Promise((resolve) => {
        process.on('close', (code) => {
          const cleanedStdout = stdout.trim();
          const cleanedStderr = stderr.trim();
      
          resolve({
            status: code === 0 ? 'completed' : 'failed',
            output: cleanedStdout || null,
            error: cleanedStderr || null,
          });
        });
      
        process.on('error', (error) => {
          resolve({
            status: 'failed',
            output: null,
            error: `Execution error: ${error.message}`,
          });
        });
      });
    } catch (error) {
      return {
        status: 'failed',
        output: null,
        error: `Execution error: ${error.message}`,
      };
    }
  }

  async createOrUpdateSubmission(
    userId: number,
    language: string,
    problemId: number,
    code: string,
    stdinInput: string,
  ) {

    let submission = await this.submissionModel.findOne({
      where: { userId, problemId },
    });

    let acceptanceSubmission: AcceptanceSubmission | null = null;

    if (submission) {

      acceptanceSubmission = await this.acceptanceSubmissionModel.findOne({
        where: { submissionId: submission.id },
      });
      if (acceptanceSubmission && acceptanceSubmission.status === 'accepted') {
        return {
          message: 'Your submission has already been completed and accepted.',
          status: 200,
          submission,
          acceptanceSubmission,
        };
      }

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
        acceptanceSubmission = await this.acceptanceSubmissionModel.create({
          userId,
          submissionId: submission.id,
          language,
          code,
          status: 'pending',
        });
      }
    } else {

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
    const mappedLanguage = this.mapLanguageToVersion(language);
    if (!mappedLanguage) {
      submission.status = 'failed';
      submission.error = 'Unsupported language';
      await submission.save();

      acceptanceSubmission.status = 'rejected';
      acceptanceSubmission.output = null;
      acceptanceSubmission.error = 'Unsupported language';
      await acceptanceSubmission.save();

      return {
        message: 'Unsupported language. Submission rejected.',
        status: 400,
        submission,
        acceptanceSubmission,
      };
    }

    const execResult = await this.executeCodeDirectly(language, code, stdinInput);

    submission.status = execResult.status === 'completed' ? 'completed' : 'failed';
    submission.output = execResult.output;
    submission.error = execResult.error;
    await submission.save();

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
      status: submission.status === 'completed' ? 201 : 400,
      submission,
      acceptanceSubmission,
    };
  }


  async runCode(language: string, code: string, stdinInput: string) {
    const result = await this.executeCodeDirectly(language, code, stdinInput);
    return result;
  }

  async getSubmissionByUserIdAndProblemId(
    userId: number,
    problemId?: number,
  ): Promise<Submission[] | Submission | null> {
    if (problemId) {
      return this.submissionModel.findOne({
        where: { userId, problemId },
        include: [
          {
            model: AcceptanceSubmission,
            required: false,
          },
          {
            model: Problems,
            attributes: ['title'],
            required: false,
          },
        ],
      });
    } else {
      return this.submissionModel.findAll({
        where: { userId },
        include: [
          {
            model: AcceptanceSubmission,
            required: false,
          },
          {
            model: Problems,
            attributes: ['title'],
            required: false,
          },
        ],
      });
    }
  }
}