// src/language-code/dto/create-language-code.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLanguageCodeDto {
  @ApiProperty({ description: 'The language_code of the languageCode' })
  @IsNotEmpty()
  @IsString()
  language_code: string;
}
