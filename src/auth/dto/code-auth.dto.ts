import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class codeAuthDto {
    @IsNotEmpty({ message: "Id cannot be empty" })
    @ApiProperty({ description: 'Id of the user' })
    id: string
    @IsNotEmpty({ message: "Code cannot be empty" })
    @ApiProperty({ description: 'The code of the user' })
    codeId: string;
}
export class RetryActiveDto {
    @ApiProperty({ description: 'The email of the user for retrying activation' })
    @IsNotEmpty({ message: 'Email cannot be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;
}
export class ChangePasswordAuthDto {
    @IsNotEmpty({ message: "Password cannot be empty" })
    @ApiProperty()
    password: string
    @IsNotEmpty({ message: "Code cannot be empty" })
    @ApiProperty()
    code: string
    @IsNotEmpty({ message: "ConfirmPassword cannot be empty" })
    @ApiProperty()
    confirmPassword: string
    @IsNotEmpty({ message: "Email cannot be empty" })
    @ApiProperty()
    email: string

}