import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";

export class CreateAuthDto {
    @ApiProperty({ description: 'The username of the user' })
    @IsNotEmpty({ message: "Username cannot be empty" })
    @Matches(/^[^\s!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+$/, { message: "Username cannot contain special characters or spaces" })
    username: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsNotEmpty({ message: "Password cannot be empty" })
    @Matches(/^\S+$/, { message: "Password cannot contain spaces" })
    password: string;

    @ApiProperty({ description: 'The name of the user' })
    @IsOptional()
    @Matches(/^[^\s!@#$%^&*()_+=[\]{};':"\\|,.<>/?]+$/, { message: "Name cannot contain special characters or spaces" })
    name: string;

    @ApiProperty({ description: 'The email of the user' })
    @IsNotEmpty({ message: "Email cannot be empty" })
    @IsEmail({}, { message: "Invalid email format" })
    @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "Email cannot contain special characters except @, ., and -" })
    email: string;
}
