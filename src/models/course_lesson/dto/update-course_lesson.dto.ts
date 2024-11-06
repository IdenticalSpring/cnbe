import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseLessonDto } from './create-course_lesson.dto';

export class UpdateCourseLessonDto extends PartialType(CreateCourseLessonDto) {}
