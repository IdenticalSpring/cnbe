import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateAuthDto {
    @ApiProperty({ description: 'The email of the user' })
    @IsNotEmpty({ message: "Email cannot be empty" })
    email: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsNotEmpty({ message: "Password cannot be empty" })
    password: string;

    @ApiProperty({ description: 'The name of the user' })
    @IsOptional({ message: "Name cannot be empty" })
    name: string;
}
