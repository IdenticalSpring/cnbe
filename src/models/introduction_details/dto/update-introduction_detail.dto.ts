import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateIntroductionDetailDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    detail?: string;

    @IsInt()
    @IsOptional()
    introductionId?: number;
}
