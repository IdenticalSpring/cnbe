import { Module } from '@nestjs/common';
import { GptApiService } from './gpt-api.service';
import { GptApiController } from './gpt-api.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [GptApiController],
  providers: [GptApiService],
})
export class GptApiModule { }
