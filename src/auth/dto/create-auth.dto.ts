import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator"

export class CreateAuthDto {
    @ApiProperty({ description: 'The username of the user' })
    @IsNotEmpty({ message: "Username cannot be empty" })
    username: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsNotEmpty({ message: "Password cannot be empty" })
    password: string;

    @ApiProperty({ description: 'The name of the user' })
    @IsOptional()
    name: string;

    @ApiProperty({ description: 'The email of the user' })
    @IsNotEmpty({ message: "Email cannot be empty" })
    @IsEmail({}, { message: "Invalid email format" })
    email: string;
}
