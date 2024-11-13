import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { Submission } from './entities/submission.model';
import { AcceptanceSubmission } from '../acceptance_submissions/entities/acceptance_submissions.entity';
import { CreateSubmissionDto } from './dto/submission.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission)
    private readonly submissionModel: typeof Submission,
    @InjectModel(AcceptanceSubmission)
    private readonly acceptanceSubmissionModel: typeof AcceptanceSubmission,
  ) {}

  public mapLanguageToId(language: string): number {
    const languageMap = {
      python: 100,
      javascript: 93,
      c: 52,
      csharp: 51,
      java: 91,
      dart: 90,
      php: 98,
      ruby: 72,
      typescript: 101,
      kotlin: 78,
      lua: 64,
      cpp: 105,
      assembly: 45,
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
      status: 'pending', // Bạn có thể thay đổi trạng thái mặc định nếu cần
    });

    const judge0Options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true',
      headers: {
        'x-rapidapi-key': 'a51392120fmshf8b944e8e3afe15p1fb976jsn80348da00d5c',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: {
        language_id: this.mapLanguageToId(language),
        source_code: Buffer.from(code).toString('base64'),
        stdin: Buffer.from(stdinInput).toString('base64'),
      },
    };

    try {
      const judge0Response = await axios(judge0Options);
      const output = judge0Response.data.stdout;
      const error = judge0Response.data.stderr;

      if (error) {
        submission.status = 'failed';
        submission.output = null;
        submission.error = error;
      } else if (output) {
        submission.status = 'completed';
        submission.output = Buffer.from(output, 'base64').toString('utf-8');
        submission.error = null;
      }

      await submission.save();
      return { submission, acceptanceSubmission }; // Trả về cả hai đối tượng
    } catch (error) {
      submission.status = 'failed';
      submission.output = null;
      submission.error = 'Judge0 API Error: ' + error.message;
      await submission.save();

      throw new Error('Judge0 API Error: ' + error.message);
    }
  }
  async submitToJudge0(createSubmissionDto: CreateSubmissionDto, userId: number) {
    const { code, language, stdin } = createSubmissionDto;
    const languageId = this.mapLanguageToId(language);
    if (!languageId) {
      throw new Error('Unsupported language');
    }

    const judge0Options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      headers: {
        'x-rapidapi-key': 'a51392120fmshf8b944e8e3afe15p1fb976jsn80348da00d5c',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: {
        language_id: languageId,
        source_code: code,
        stdin: stdin || '',
      },
    };
    console.log("Request Data to Judge0:", judge0Options.data);

    try {
      const response = await axios(judge0Options);
      return response.data;
    } catch (error) {
      console.error("Error calling Judge0 API:", error.response ? error.response.data : error.message);
      throw new Error('Error calling Judge0 API: ' + (error.response ? error.response.data : error.message));
    }
  }
}
