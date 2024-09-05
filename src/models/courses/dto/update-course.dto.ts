import { PartialType } from '@nestjs/swagger';
import { CreateCoursesDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCoursesDto) {}
