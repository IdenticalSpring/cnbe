import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Name of the company',
    example: 'Tech Corp',
  })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString()
  name!: string;
}
