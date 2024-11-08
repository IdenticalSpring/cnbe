import { Injectable } from '@nestjs/common';
import PayOS from '@payos/node';
import axios from 'axios';


@Injectable()
export class PayOSService {
    private payOSClient;
    constructor() {
        this.payOSClient = new PayOS(
            process.env.PAYOS_CLIENT_ID,
            process.env.PAYOS_API_KEY,
            process.env.PAYOS_CHECKSUM_KEY,
        );
    }

    // Tạo link thanh toán
    async createPaymentLink(orderData: {
        orderCode: number;
        amount: number;
        description: string;
        returnUrl: string;
        cancelUrl: string;
        items: { name: string; quantity: number; price: number }[];
    }) {
        try {
            const paymentLinkResponse = await this.payOSClient.createPaymentLink(orderData);
            return paymentLinkResponse.checkoutUrl; 
        } catch (error) {
            throw new Error('Error creating payment link');
        }
    }

    // Lấy thông tin link thanh toán
    async getPaymentLinkInfo(orderCode: number | string) {
        try {
            const paymentLinkInfo = await this.payOSClient.getPaymentLinkInformation(orderCode);
            console.log("Payment Link Info:", paymentLinkInfo); // Kiểm tra toàn bộ phản hồi
            return paymentLinkInfo;
        } catch (error) {
            console.error("Error details:", error.response ? error.response.data : error.message);
            throw new Error('Error retrieving payment link info');
        }
    }


    // Hủy link thanh toán
    async cancelPaymentLink(orderCode: number, reason: string) {
        try {
            const cancellationResponse = await this.payOSClient.cancelPaymentLink(orderCode, reason);
            return cancellationResponse;
        } catch (error) {
            throw new Error('Error cancelling payment link');
        }
    }
}
