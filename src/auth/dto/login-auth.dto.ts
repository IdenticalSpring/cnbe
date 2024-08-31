import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class LoginAuthDto {
    @ApiProperty({ description: 'The email of the user' })
    @IsNotEmpty({ message: "Email cannot be empty" })
    email: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsNotEmpty({ message: "Password cannot be empty" })
    password: string;
}
