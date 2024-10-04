import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateIntroductionDetailDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    detail: string;


}
