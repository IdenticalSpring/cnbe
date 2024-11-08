import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PayOSService } from './payos.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';

@ApiTags('payos') 
@Controller('payos')
@ApiBearerAuth('JWT')
export class PayOSController {
  constructor(private readonly payOSService: PayOSService) {}

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
    @Get('success')
  async paymentSuccess() {
    return {
      status: 'success',
      message: 'Payment was successful',
      timestamp: new Date().toISOString(),
    };
  }
    @Public()
    @ApiExcludeEndpoint()
    @Get('cancel')
  async paymentCancel() {
    return {
      status: 'cancelled',
      message: 'Payment was cancelled by the user',
      timestamp: new Date().toISOString(),
    };
  }
}
