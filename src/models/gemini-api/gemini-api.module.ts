import { Module } from '@nestjs/common';
import { GeminiApiService } from './gemini-api.service';
import { GeminiApiController } from './gemini-api.controller';

@Module({
  controllers: [GeminiApiController],
  providers: [GeminiApiService],
})
export class GeminiApiModule { }
