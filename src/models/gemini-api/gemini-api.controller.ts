import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { GeminiApiService } from './gemini-api.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';
import { PromptDto } from './dto/create-gemini-api.dto';

@Controller('gemini')
@ApiTags('gemini')
@Public()
export class GeminiApiController {
  constructor(private readonly geminiApiService: GeminiApiService) { }

  @Post('generate-content')
  async generateContent(@Body() promptDto: PromptDto) {
    try {
      const result = await this.geminiApiService.generateContent(promptDto.prompt);
      return { result };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to generate content', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
