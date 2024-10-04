import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateCourseIntroductionDto {
    @IsInt()
    @IsOptional()
    @ApiProperty()
    courseId?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty()
    introductionDetailId?: number;
}
