import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateAuthDto {
    @ApiProperty({ description: 'The email of the user' })
    @IsNotEmpty({ message:"Email không được để trống"})
    email:string
    @ApiProperty({ description: 'The password of the user' })
    @IsNotEmpty({ message: "Password không được để trống" })
    password:string
    @ApiProperty({ description: 'The password of the user' })
    @IsOptional({ message: "Name không được để trống" })
    name: string
}
