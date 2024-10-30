import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateProblemCompanyDto {
  @ApiProperty({ description: 'The problemId of the Problem' })
  @IsInt()
  @IsNotEmpty({ message: 'problemId cannot be empty' })
  problemId: number;

  @IsInt()
  @ApiProperty({ description: 'The companyId of the Company' })
  @IsNotEmpty({ message: 'companyId cannot be empty' })
  companyId: number;
}
