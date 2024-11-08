import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { PayOSService } from './payos.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';
import { OrdersService } from '../orders/orders.service';

@ApiTags('payos')
@Controller('payos')
@ApiBearerAuth('JWT')
export class PayOSController {
    constructor(
        private readonly payOSService: PayOSService,
        private readonly ordersService: OrdersService,
    ) { }

    @ApiOperation({ summary: 'Create a payment link' })
    @ApiBody({
        description: 'Data to create a payment link',
        schema: {
            type: 'object',
            properties: {
                orderCode: { type: 'number' },
                amount: { type: 'number' },
                description: { type: 'string' },
            },
            required: ['orderCode', 'amount', 'description'],
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Payment link created successfully',
        schema: {
            type: 'object',
            properties: {
                checkoutUrl: { type: 'string' },
            },
        },
    })
    @Post('create-payment-link')
    async createPaymentLink(
        @Body() orderData: { orderCode: number; amount: number; description: string }
    ) {
        const YOUR_DOMAIN = process.env.BACKEND_URL;
        const fullOrderData = {
            ...orderData,
            returnUrl: `${YOUR_DOMAIN}/api/v1/payos/success`,
            cancelUrl: `${YOUR_DOMAIN}/api/v1/payos/cancel`,
            items: [
                {
                    name: 'Product example',
                    quantity: 1,
                    price: orderData.amount,
                },
            ],
        };
        const checkoutUrl = await this.payOSService.createPaymentLink(fullOrderData);
        return { checkoutUrl };
    }

    @ApiOperation({ summary: 'Get payment link information' })
    @ApiParam({ name: 'orderCode', type: 'string', description: 'Order code' })
    @ApiResponse({
        status: 200,
        description: 'Checkout URL for the payment link',
        schema: {
            type: 'object',
            properties: {
                checkoutUrl: { type: 'string' },
            },
        },
    })
    @Get('payment-link/:orderCode')
    async getPaymentLinkInfo(@Param('orderCode') orderCode: string) {
        const paymentLinkInfo = await this.payOSService.getPaymentLinkInfo(orderCode);
        return paymentLinkInfo;
    }

    @ApiOperation({ summary: 'Cancel a payment link' })
    @ApiParam({ name: 'orderCode', type: 'number', description: 'Order code' })
    @ApiBody({
        description: 'Reason for cancellation',
        schema: {
            type: 'object',
            properties: {
                reason: { type: 'string' },
            },
            required: ['reason'],
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Payment link cancelled successfully',
    })
    @Post('cancel-payment-link/:orderCode')
    async cancelPaymentLink(
        @Param('orderCode') orderCode: number,
        @Body('reason') reason: string
    ) {
        return this.payOSService.cancelPaymentLink(orderCode, reason);
    }

    @Public()
    @ApiExcludeEndpoint()
    @ApiOperation({ summary: 'Handle successful payment' })
    @Get('success')
    async paymentSuccess(@Query('orderCode') orderCode: number) {
        const order = await this.ordersService.findOne(orderCode);
        order.paymentStatus = 'completed';
        order.paymentDate = new Date();
        await order.save();

        return {
            status: 'success',
            message: 'Payment was successful',
            timestamp: new Date().toISOString(),
        };
    }
    @Public()
    @ApiExcludeEndpoint()
    @ApiOperation({ summary: 'Handle payment cancellation' })
    @Get('cancel')
    async paymentCancel(
        @Query('code') code: string,
        @Query('id') id: string,
        @Query('cancel') cancel: string,
        @Query('status') status: string,
        @Query('orderCode') orderCode: string
    ) {
        const orderId = parseInt(orderCode, 10);

        if (isNaN(orderId)) {
            return { error: 'Invalid orderCode provided' };
        }

        // Tìm đơn hàng theo orderId và cập nhật trạng thái thành "cancelled" nếu hợp lệ
        const order = await this.ordersService.findOne(orderId);
        if (!order) {
            return { error: 'Order not found' };
        }

        order.paymentStatus = 'cancelled';
        await order.save();

        return {
            status: 'cancelled',
            message: 'Payment was cancelled by the user',
            code,
            id,
            cancel,
            orderCode,
            timestamp: new Date().toISOString(),
        };
    }
}
