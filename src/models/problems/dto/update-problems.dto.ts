import { PartialType } from '@nestjs/swagger';
import { CreateProblemsDto } from './create-problems.dto';

export class UpdateProblemsDto extends PartialType(CreateProblemsDto) {}
