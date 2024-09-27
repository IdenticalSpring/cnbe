import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateCourseIntroductionDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsInt()
    @IsNotEmpty()
    courseId: number;
}
