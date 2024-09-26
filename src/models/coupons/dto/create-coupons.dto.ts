import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCouponDto {
  @ApiProperty({ description: 'The Code of the course' })
  @IsNotEmpty({ message: 'Code cannot be empty' })
  code: string;

  @ApiProperty({ description: 'The discountAmount of the course' })
  @IsNotEmpty({ message: 'DiscountAmount cannot be empty' })
  discountAmount: number;

  @ApiProperty({ description: 'The validFrom date of the course' })
  @IsNotEmpty({ message: 'ValidFrom cannot be empty' })
  validFrom: string;

  @ApiProperty({ description: 'The validTo date of the course' })
  @IsNotEmpty({ message: 'ValidTo cannot be empty' })
  validTo: string;

  @ApiProperty({ description: 'The isActive status of the course' })
  @IsNotEmpty({ message: 'IsActive cannot be empty' })
  isActive: boolean;
}
