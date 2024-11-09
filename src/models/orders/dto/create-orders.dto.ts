import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'The userId of the course' })
  @IsNotEmpty({ message: 'The userId cannot be empty' })
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'The courseId of the course' })
  @IsNotEmpty({ message: 'The courseId cannot be empty' })
  @IsNumber()
  courseId: number;

  @ApiProperty({ description: 'The amount of the course', required: false })
  @IsOptional()
  @IsNumber()
  price?: number; 

  @ApiProperty({ description: 'The discountId of the course', required: false })
  @IsOptional()
  @IsNumber()
  discountId?: number;

  @ApiProperty({
    description: 'The paymentMethod of the course',
    enum: ['ZaloPay', 'PayOS', 'Momo'],
    default: 'PayOS',
  })
  @IsEnum(['ZaloPay', 'PayOS', 'Momo'], {
    message: 'paymentMethod must be either ZaloPay, PayOS, or Momo',
  })
  @IsOptional()
  paymentMethod: 'ZaloPay' | 'PayOS' | 'Momo' = 'PayOS';

  @ApiProperty({
    description: 'The paymentMethod of the course',
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending',
  })
  @IsEnum(['pending', 'in-progress', 'completed'], {
    message: 'Status must be either pending, in-progress, or completed',
  })
  @IsNotEmpty({ message: 'The paymentSatus cannot be empty' })
  @IsOptional()
  paymentStatus: 'pending' | 'in-progress' | 'completed';

  @IsOptional()
  @IsDate()
  paymentDate: Date;
}
