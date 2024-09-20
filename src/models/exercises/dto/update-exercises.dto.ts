import { PartialType } from '@nestjs/swagger';
import { CreateExercisesDto } from './create-exercises.dto';

export class UpdateExercisesDto extends PartialType(CreateExercisesDto) {}
