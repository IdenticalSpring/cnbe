import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class LoginAuthDto {
    @ApiProperty({ description: 'The username of the user' })
    @IsNotEmpty({ message: "Username cannot be empty" })
    username: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsNotEmpty({ message: "Password cannot be empty" })
    password: string;
}
