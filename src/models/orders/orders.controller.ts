import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { OrdersService } from './orders.service';

@ApiTags('orders')
@Controller('orders')
@ApiBearerAuth('JWT')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  // 1. Tạo đơn hàng với link thanh toán
  @ApiOperation({ summary: 'Create an order with a payment link' })
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.ordersService.create(createOrderDto);
    return order;
  }

  // 2. Lấy tất cả các đơn hàng
  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // 3. Lấy đơn hàng theo ID
  @ApiOperation({ summary: 'Get an order by ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const orderId = parseInt(id, 10);
    if (isNaN(orderId)) throw new Error('Invalid order ID');
    return this.ordersService.findOne(orderId);
  }

  // 4. Lấy lịch sử đơn hàng theo userId
  @ApiOperation({ summary: 'History of orders by User ID' })
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    const parsedUserId = parseInt(userId, 10);
    if (isNaN(parsedUserId)) throw new Error('Invalid user ID');
    return this.ordersService.findByUserId(parsedUserId);
  }

  // 5. Cập nhật thông tin đơn hàng
  @ApiOperation({ summary: 'Update an order' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const orderId = parseInt(id, 10);
    if (isNaN(orderId)) throw new Error('Invalid order ID');

    const order = await this.ordersService.findOne(orderId);
    if (!order) throw new Error('Order not found');

    if (updateOrderDto.paymentStatus === 'completed') {
      updateOrderDto.paymentDate = new Date();
    }

    return order.update(updateOrderDto);
  }

  // 6. Xóa đơn hàng theo ID
  @ApiOperation({ summary: 'Delete an order' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const orderId = parseInt(id, 10);
    if (isNaN(orderId)) throw new Error('Invalid order ID');
    return this.ordersService.remove(orderId);
  }
  @ApiOperation({ summary: 'Check if user has purchased the course' })
  @Get('check-purchase-status/:userId/:courseId')
  async checkPurchaseStatus(
    @Param('userId') userId: number, 
    @Param('courseId') courseId: number,
  ) {
    const hasPurchased = await this.ordersService.hasPurchasedCourse(userId, courseId);
    return { hasPurchased };
  }
}
