import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { Orders } from './entities/orders.entites';
import { CouponsService } from '../coupons/coupons.service';
import { CoursesModule } from '../courses/courses.module';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders)
    private orderModel: typeof Orders,
    private couponsService: CouponsService,
    private coursesService: CoursesService,
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
    // Lấy thông tin khóa học và giá của khóa học từ courseId
    const course = await this.coursesService.findOne(createOrderDto.courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // Lấy giá khóa học từ Courses
    let coursePrice = course.price;
    let discountAmount = 0;

    // Nếu có mã giảm giá, kiểm tra và tính giảm giá
    if (createOrderDto.discountId) {
      const coupon = await this.couponsService.findById(createOrderDto.discountId);
      if (
        coupon.validFrom <= new Date() &&
        coupon.validTo >= new Date() &&
        coupon.isActive
      ) {
        discountAmount = coupon.discountAmount;
      }
    }

    // Tính tổng số tiền sau khi áp dụng giảm giá (nếu có)
    const totalAmount = coursePrice - (coursePrice * discountAmount) / 100;

    // Tạo đơn hàng với giá cuối cùng
    return this.orderModel.create({
      ...createOrderDto,
      price: totalAmount,
    });
  }



  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Orders> {
    const order = await this.findOne(id);

    let discountAmount = 0;

    // Check if a discount ID is provided and calculate discount if valid
    if (updateOrderDto.discountId) {
      const coupon = await this.couponsService.findById(updateOrderDto.discountId);
      if (
        coupon.validFrom <= new Date() &&
        coupon.validTo >= new Date() &&
        coupon.isActive
      ) {
        discountAmount = coupon.discountAmount;
      }
    }

    // Calculate the updated total amount with discount, if any
    const totalAmount = updateOrderDto.price - (updateOrderDto.price * discountAmount) / 100;

    // Update the order with the new values, including the recalculated price
    return order.update({
      ...updateOrderDto,
      price: totalAmount,
    });
  }


  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await order.destroy();
  }
}
