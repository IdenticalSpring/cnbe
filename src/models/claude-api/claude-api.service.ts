import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ClaudeApiService {
  private readonly apiKey = process.env.CLAUDE_API_KEY;
  private readonly apiUrl = 'https://api.anthropic.com/v1/generate'; // URL giả định

  constructor(private readonly httpService: HttpService) { }

  async generateContent(prompt: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          { prompt },
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to generate content from Claude', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
