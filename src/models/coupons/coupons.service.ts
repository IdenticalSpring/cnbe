import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Coupons } from './entities/coupons.entites';
import { CreateCouponDto } from './dto/create-coupons.dto';
import { UpdateCouponDto } from './dto/update-coupons.dto';

@Injectable()
export class CouponsService {
  constructor(
    @InjectModel(Coupons)
    private couponModel: typeof Coupons,
  ) {}
  async findAll(): Promise<Coupons[]> {
    return this.couponModel.findAll();
  }
  // Create a new coupon
  async create(createCouponDto: CreateCouponDto): Promise<Coupons> {
    // Chuyển chuỗi ngày sang đối tượng Date
    const validFrom = new Date(createCouponDto.validFrom);
    const validTo = new Date(createCouponDto.validTo);

    return this.couponModel.create({
      ...createCouponDto,
      validFrom,
      validTo,
    });
  }

  // Find a coupon by ID
  async findById(id: number): Promise<Coupons> {
    const coupon = await this.couponModel.findByPk(id);
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }
    return coupon;
  }

  // Find a coupon by code
  async findByCode(code: string): Promise<Coupons> {
    const coupon = await this.couponModel.findOne({ where: { code } });
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }
    return coupon;
  }

  // Update a coupon
  async update(id: number, updateCouponDto: UpdateCouponDto): Promise<Coupons> {
    const coupon = await this.findById(id);

    const validFrom = updateCouponDto.validFrom
      ? new Date(updateCouponDto.validFrom)
      : coupon.validFrom;
    const validTo = updateCouponDto.validTo
      ? new Date(updateCouponDto.validTo)
      : coupon.validTo;

    return coupon.update({
      ...updateCouponDto,
      validFrom,
      validTo,
    });
  }

  // Delete a coupon
  async remove(id: number): Promise<void> {
    const coupon = await this.findById(id);
    await coupon.destroy();
  }
}
