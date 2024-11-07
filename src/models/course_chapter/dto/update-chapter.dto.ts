import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateChapterDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Title of the chapter', required: false })
    title?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'Description of the chapter', required: false })
    description?: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({ description: 'Order of the chapter in the course', required: false })
    order?: number;
}
