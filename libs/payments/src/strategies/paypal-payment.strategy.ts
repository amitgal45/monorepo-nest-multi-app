import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  PaymentProvider,
  PaymentResult,
} from '../interfaces/payment-provider.interface';
import * as paypal from '@paypal/checkout-server-sdk';
import { PaymentStatus } from '@app/shared';

@Injectable()
export class PayPalPaymentStrategy implements PaymentProvider {
  private client: paypal.core.PayPalHttpClient;

  constructor(private configService: ConfigService) {
    const environment = new paypal.core.SandboxEnvironment(
      this.configService.get<string>('PAYPAL_CLIENT_ID'),
      this.configService.get<string>('PAYPAL_CLIENT_SECRET'),
    );
    this.client = new paypal.core.PayPalHttpClient(environment);
  }

  async processPayment(
    amount: number,
    currency: string,
    paymentMethodId: string,
  ): Promise<PaymentResult> {
    const request = new paypal.orders.OrdersCaptureRequest(paymentMethodId);
    request.requestBody({} as any);

    try {
      const response = await this.client.execute(request);
      const captureId =
        response.result.purchase_units[0].payments.captures[0].id;

      return {
        success: response.result.status === 'COMPLETED',
        transactionId: captureId,
        status: this.mapPayPalStatus(response.result.status),
      };
    } catch (error) {
      return {
        success: false,
        status: PaymentStatus.FAILED,
        error: error.message,
      };
    }
  }

  async refundPayment(transactionId: string): Promise<PaymentResult> {
    const request = new paypal.payments.CapturesRefundRequest(transactionId);
    request.requestBody({} as unknown as paypal.payments.Refund);

    try {
      const response = await this.client.execute(request);

      return {
        success: response.result.status === 'COMPLETED',
        transactionId: response.result.id,
        status: this.mapPayPalStatus(response.result.status),
      };
    } catch (error) {
      return {
        success: false,
        status: PaymentStatus.FAILED,
        error: error.message,
      };
    }
  }

  private mapPayPalStatus(paypalStatus: string): PaymentStatus {
    switch (paypalStatus) {
      case 'COMPLETED':
        return PaymentStatus.COMPLETED;
      case 'PENDING':
        return PaymentStatus.PENDING;
      default:
        return PaymentStatus.FAILED;
    }
  }
}
