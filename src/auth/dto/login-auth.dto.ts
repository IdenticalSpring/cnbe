import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class LoginAuthDto {
    @ApiProperty({ description: 'The email of the user' })
    @IsNotEmpty({ message:"Email không được để trống"})
    email:string
    @ApiProperty({ description: 'The password of the user' })
    @IsNotEmpty({ message: "Password không được để trống" })
    password:string
    
}
