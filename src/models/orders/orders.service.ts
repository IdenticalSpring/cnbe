import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { Orders } from './entities/orders.entites';
import { CouponsService } from '../coupons/coupons.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders)
    private orderModel: typeof Orders,
    private couponsService: CouponsService,
  ) {}

  async findAll(): Promise<Orders[]> {
    return this.orderModel.findAll();
  }

  async findOne(id: number): Promise<Orders> {
    const order = await this.orderModel.findByPk(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
  async findByUserId(userId: number): Promise<Orders[]> {
    return this.orderModel.findAll({
      where: {
        userId: userId,
      },
    });
  }

  async create(createOrderDto: CreateOrderDto): Promise<Orders> {
    let discountAmount = 0;
    if (createOrderDto.discountId) {
      const coupon = await this.couponsService.findById(
        createOrderDto.discountId,
      );
      // Kiểm tra tính hợp lệ của mã giảm giá
      if (
        coupon.validFrom <= new Date() &&
        coupon.validTo >= new Date() &&
        coupon.isActive
      ) {
        discountAmount = coupon.discountAmount;
      }
    }

    const totalAmount =
      createOrderDto.price - createOrderDto.price * discountAmount;

    return this.orderModel.create({
      ...createOrderDto,
      price: totalAmount, // Lưu số tiền sau khi giảm giá
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Orders> {
    const order = await this.findOne(id);

    // Nếu có mã giảm giá, tính toán lại số tiền
    if (updateOrderDto.discountId) {
      const coupon = await this.couponsService.findById(
        updateOrderDto.discountId,
      );
      if (
        coupon.validFrom <= new Date() &&
        coupon.validTo >= new Date() &&
        coupon.isActive
      ) {
        const discountAmount = coupon.discountAmount;
        updateOrderDto.price = order.price - order.price * discountAmount; // Cập nhật số tiền
      }
    }

    return order.update(updateOrderDto);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await order.destroy();
  }
}
