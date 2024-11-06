import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCourseLessonDto {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID của chương mà bài học thuộc về' })
    chapterId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Tiêu đề của bài học' })
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Nội dung của bài học', required: false })
    content?: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({ description: 'Thứ tự của bài học trong chương', required: false })
    order?: number;
}
