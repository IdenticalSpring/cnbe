import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateAuthDto {
    @ApiProperty({ description: 'The name of the user' })
    @IsNotEmpty({ message:"Username không được để trống"})
    username:string
    @ApiProperty({ description: 'The password of the user' })
    @IsNotEmpty({ message: "Password không được để trống" })
    password:string
}
