import { PartialType } from '@nestjs/swagger';
import { CreateDiscussDto } from './create-discussion.dto';

export class UpdateDisscussDto extends PartialType(CreateDiscussDto) {}
