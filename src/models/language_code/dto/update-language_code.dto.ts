// src/language-code/dto/update-language-code.dto.ts
import { IsString } from 'class-validator';

export class UpdateLanguageCodeDto {
  @IsString()
  language_code: string;
}
