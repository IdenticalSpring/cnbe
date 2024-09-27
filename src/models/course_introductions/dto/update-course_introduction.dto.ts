import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateCourseIntroductionDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    content?: string;

    @IsInt()
    @IsOptional()
    courseId?: number;
}
