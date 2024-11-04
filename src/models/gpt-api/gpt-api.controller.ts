
import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { GptApiService } from './gpt-api.service';
import { ApiTags } from '@nestjs/swagger';
import { PromptDto } from '../gemini-api/dto/create-gemini-api.dto';

@ApiTags('gpt')
@Controller('gpt')
export class GptApiController {
  constructor(private readonly gptApiService: GptApiService) { }

  @Post('generate')
  async generateText(@Body() promptDto: PromptDto) {
    try {
      const text = await this.gptApiService.generateText(promptDto.prompt);
      return { result: text };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to generate text with GPT', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
