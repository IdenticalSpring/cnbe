import { ApiProperty } from '@nestjs/swagger';

export class CreateCoursesDto {
  @ApiProperty({ description: 'The title of the course' })
  title: string;

  @ApiProperty({ description: 'The description of the course' })
  description: string;
}
