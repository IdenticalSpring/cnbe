import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCourseIntroductionDto {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    courseId: number;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    introductionDetailId: number;
}
