import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateIntroductionDetailDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    title?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    detail?: string;


}
