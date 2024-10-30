import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTopicDto {
  @ApiProperty({ description: 'The name of the Topic' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString()
  name: string;
}
