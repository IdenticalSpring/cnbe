import { PartialType } from '@nestjs/mapped-types';
import { CreateClaudeApiDto } from './create-claude-api.dto';

export class UpdateClaudeApiDto extends PartialType(CreateClaudeApiDto) {}
