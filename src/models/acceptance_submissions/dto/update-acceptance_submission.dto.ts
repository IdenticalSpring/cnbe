import { PartialType } from '@nestjs/mapped-types';
import { CreateAcceptanceSubmissionDto } from './create-acceptance_submission.dto';

export class UpdateAcceptanceSubmissionDto extends PartialType(
  CreateAcceptanceSubmissionDto,
) {}
