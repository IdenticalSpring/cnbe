import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDifficultyDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @ApiProperty({ description: 'The name of the Difficulty' })
  @MaxLength(50, { message: 'Name cannot be longer than 50 characters' })
  name: string;
}
