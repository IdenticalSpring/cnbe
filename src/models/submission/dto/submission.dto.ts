import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSubmissionDto {
  @ApiProperty({
    description: 'Programming language of the submission',
    example: 'cpp',
  })
  @IsNotEmpty({ message: 'Programming language cannot be empty' })
  language: string;

  @ApiProperty({
    description: 'Source code of the submission',
    example:
      '#include <iostream>\nusing namespace std;\nint main() {\n int a, b;\n cin >> a >> b;\n cout << a + b;\n return 0;\n}',
  })
  @IsNotEmpty({ message: 'Source code cannot be empty' })
  code: string;

  @ApiProperty({
    description: 'Problem ID of the submission',
    example: 1,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'ProblemId cannot be empty' })
  problemId: number;

  @ApiProperty({
    description: 'Standard input for the submission',
    example: '5\n10',
    required: false,
  })
  @IsNotEmpty({ message: 'Standard input cannot be empty' })
  stdin?: string;
}
