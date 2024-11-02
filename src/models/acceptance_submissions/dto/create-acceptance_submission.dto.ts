import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateAcceptanceSubmissionDto {
  @ApiProperty({
    description: 'userId of the acceptance submission',
    example: '1',
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'submissionId of the acceptance submission',
    example: '1',
  })
  @IsInt()
  @IsNotEmpty()
  submissionId: number;

  @ApiProperty({
    description: 'language of the acceptance submission',
    example: 'cpp',
  })
  @IsString()
  @IsNotEmpty()
  language: string;

  @ApiProperty({
    description: 'Code of the acceptance submission',
    example:
      '#include <iostream>\nusing namespace std;\nint main() {\n int a, b;\n cin >> a >> b;\n cout << a + b;\n return 0;\n}',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Status of the acceptance submission',
    example: 'accepted',
    enum: ['pending', 'accepted', 'rejected'],
  })
  @IsEnum(['pending', 'accepted', 'rejected'])
  @IsOptional()
  status?: 'pending' | 'accepted' | 'rejected';

  @ApiProperty({
    description: 'Output of the acceptance submission',
    example: '15',
  })
  @IsString()
  @IsOptional()
  output?: string;

  @ApiProperty({
    description: 'Error of the acceptance submission',
    example: 'No errors',
  })
  @IsString()
  @IsOptional()
  error?: string;
}
