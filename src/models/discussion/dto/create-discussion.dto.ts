import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateDiscussDto {
  @ApiProperty({ description: 'The title of the Discuss' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The content of the Discuss' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
