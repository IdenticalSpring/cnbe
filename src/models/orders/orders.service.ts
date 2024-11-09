import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { Orders } from './entities/orders.entites';
import { CouponsService } from '../coupons/coupons.service';
import { CoursesModule } from '../courses/courses.module';
import { CoursesService } from '../courses/courses.service';
import { PayOSService } from '../payos/payos.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders)
    private orderModel: typeof Orders,
    private couponsService: CouponsService,
    private coursesService: CoursesService,
    private payOSService: PayOSService,
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
    // Kiểm tra xem đã có đơn hàng hoàn thành với userId và courseId chưa
    const existingOrder = await this.orderModel.findOne({
      where: {
        userId: createOrderDto.userId,
        courseId: createOrderDto.courseId,
      },
    });

    if (existingOrder) {
      if (existingOrder.paymentStatus === 'completed') {
        // Nếu đã có đơn hàng hoàn tất thanh toán, trả về JSON lỗi
        throw new ConflictException({
          statusCode: 409,
          message: 'User has already purchased this course',
        });
      } else {
        // Nếu đã có đơn hàng nhưng chưa hoàn tất thanh toán, xóa đơn hàng đó
        await existingOrder.destroy();
      }
    }

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

    // Tạo đơn hàng mới mà không có URL thanh toán
    const order = await this.orderModel.create({
      ...createOrderDto,
      price: totalAmount,
    });

    // Tạo link thanh toán với PayOS
    const checkoutUrl = await this.payOSService.createPaymentLink({
      orderCode: order.id,
      amount: totalAmount,
      description: `Đơn hàng ${order.id}`,
      returnUrl: `${process.env.BACKEND_URL}/api/v1/payos/success`,
      cancelUrl: `${process.env.BACKEND_URL}/api/v1/payos/cancel`,
      items: [
        {
          name: `Khóa học ${course.title}`,
          quantity: 1,
          price: totalAmount,
        },
      ],
    });

    // Lưu URL thanh toán vào đơn hàng
    order.checkoutUrl = checkoutUrl;
    await order.save();

    // Trả về đơn hàng mới với URL thanh toán
    return order;
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
  async findOrderByUserAndCourse(userId: number, courseId: number) {
    return this.orderModel.findOne({
      where: {
        userId,
        courseId,
        paymentStatus: 'completed', 
      },
    });
  }
  async hasPurchasedCourse(userId: number, courseId: number): Promise<boolean> {
    const order = await this.orderModel.findOne({
      where: {
        userId,
        courseId,
        paymentStatus: 'completed', 
      },
    });
    return !!order; 
  }
}
