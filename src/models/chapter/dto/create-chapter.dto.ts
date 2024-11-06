import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateChapterDto {
    @IsInt()
    @IsNotEmpty()
    @ApiProperty({ description: 'ID of the course to which the chapter belongs' })
    courseId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Title of the chapter' })
    title: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Description of the chapter', required: false })
    description?: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({ description: 'Order of the chapter in the course', required: false })
    order?: number;
}
