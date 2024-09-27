import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateIntroductionDetailDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    detail: string;

    @IsInt()
    @IsNotEmpty()
    introductionId: number;
}
