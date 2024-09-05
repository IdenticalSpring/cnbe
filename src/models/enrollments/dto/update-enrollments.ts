import { PartialType } from '@nestjs/swagger';
import { CreateEnrollmentsDto } from './create-enrollments';

export class UpdateEnrollmentsDto extends PartialType(CreateEnrollmentsDto) {}
