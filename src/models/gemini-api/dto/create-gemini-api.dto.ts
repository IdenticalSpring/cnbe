import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PromptDto {
    @IsNotEmpty({ message: 'Prompt cannot be empty' })
    @ApiProperty({ example: 'Write a story about a magic backpack.' })
    prompt: string;
}
