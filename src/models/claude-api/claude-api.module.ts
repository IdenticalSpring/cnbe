import { Module } from '@nestjs/common';
import { ClaudeApiService } from './claude-api.service';
import { ClaudeApiController } from './claude-api.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ClaudeApiController],
  providers: [ClaudeApiService],
})
export class ClaudeApiModule {}
