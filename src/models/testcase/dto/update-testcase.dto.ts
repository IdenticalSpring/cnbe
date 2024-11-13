// src/test-case/dto/create-test-case.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTestCaseDto {
  @ApiProperty({ description: 'The languageID can be not empty' })
  @IsNotEmpty()
  @IsInt()
  languageCodeId: number;

  @ApiProperty({ description: 'The problemID can be not empty' })
  @IsNotEmpty()
  @IsInt()
  problemId: number;

  @ApiProperty({ description: 'The testcase can be not empty' })
  @IsNotEmpty()
  @IsString()
  testcase: string;
}
