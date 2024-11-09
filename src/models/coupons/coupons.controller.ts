import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupons.dto';
import { UpdateCouponDto } from './dto/update-coupons.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('coupons')
@Controller('coupons')
@ApiBearerAuth('JWT')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}
  @Get()
  @ApiOperation({ summary: 'Get all coupons' })
  findAll() {
    return this.couponsService.findAll();
  }
  // Create a new coupon
  @Post()
  @ApiOperation({ summary: 'Add new coupon' })
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto);
  }

  // Get coupon by ID
  @Get(':id')
  @ApiOperation({ summary: 'Find coupon by id' })
  findById(@Param('id') id: number) {
    return this.couponsService.findById(id);
  }

  // Get coupon by code
  @Get('code/:code')
  @ApiOperation({ summary: 'Find coupon by code' })
  findByCode(@Param('code') code: string) {
    return this.couponsService.findByCode(code);
  }

  // Update a coupon by ID
  @Patch(':id')
  @ApiOperation({ summary: 'Update coupon' })
  update(@Param('id') id: number, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(id, updateCouponDto);
  }

  // Delete a coupon by ID
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.couponsService.remove(id);
  }
}
