
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GptApiService {
  private readonly apiUrl = 'https://api.openai.com/v1/completions';
  private readonly apiKey = process.env.OPENAI_API_KEY; 

  constructor(private readonly httpService: HttpService) { }

  async generateText(prompt: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          {
            model: 'text-davinci-003',
            prompt,
            max_tokens: 150,
          },
          {
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      return response.data.choices[0].text;
    } catch (error) {
      throw new HttpException(
        { message: 'GPT API request failed', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
