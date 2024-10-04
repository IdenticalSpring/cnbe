import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { Submission } from './entities/submission.model';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission)
    private readonly submissionModel: typeof Submission,
  ) {}

  // Map language to Judge0 API's language_id
  private mapLanguageToId(language: string): number {
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

  // Create or update submission
  async createOrUpdateSubmission(
    userId: number,
    language: string,
    code: string,
    stdinInput: string, // Thêm input cho chương trình
  ) {
    let submission = await this.submissionModel.findOne({
      where: { userId, language },
    });

    if (!submission) {
      submission = await this.submissionModel.create({
        userId,
        language,
        code,
        status: 'failed',
      });
    } else {
      submission.code = code;
      submission.status = 'failed';
      await submission.save();
    }

    const judge0Options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true',
      headers: {
        'x-rapidapi-key': 'a51392120fmshf8b944e8e3afe15p1fb976jsn80348da00d5c', // Dùng key của bạn
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: {
        language_id: this.mapLanguageToId(language),
        source_code: Buffer.from(code).toString('base64'), // Convert code to Base64
        stdin: Buffer.from(stdinInput).toString('base64'), // Input động
      },
    };

    try {
      const judge0Response = await axios(judge0Options);
      const output = judge0Response.data.stdout;
      const error = judge0Response.data.stderr;

      if (error) {
        // Nếu có lỗi biên dịch
        submission.status = 'failed';
        submission.output = null; // Không lưu kết quả
        submission.error = error; // Lưu lỗi biên dịch
      } else if (output) {
        // Nếu biên dịch thành công
        submission.status = 'completed';
        submission.output = Buffer.from(output, 'base64').toString('utf-8'); // Giải mã output từ Base64
        submission.error = null; // Không có lỗi
      }

      await submission.save();
      return submission;
    } catch (error) {
      submission.status = 'failed';
      submission.output = null;
      submission.error = 'Judge0 API Error: ' + error.message;
      await submission.save();

      throw new Error('Judge0 API Error: ' + error.message);
    }
  }
}
