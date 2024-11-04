import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClaudeApiService } from './claude-api.service';

@ApiTags('claude')
@Controller('claude')
export class ClaudeApiController {
  constructor(private readonly claudeApiService: ClaudeApiService) { }

  @Post('generate-content')
  async generateContent(@Body('prompt') prompt: string) {
    try {
      return await this.claudeApiService.generateContent(prompt);
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to generate content', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
