import { ApiProperty } from '@nestjs/swagger';

export class ProfileResponseDto {
    @ApiProperty({ example: 1, description: 'The ID of the user' })
    id: number;

    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
    email: string;

    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    name: string;

    @ApiProperty({ example: ['user'], description: 'The roles of the user' })
    roles: string[];
}