import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import {
  PaymentProvider,
  PaymentResult,
} from '../interfaces/payment-provider.interface';
import { PaymentStatus } from '@app/shared';

@Injectable()
export class StripePaymentStrategy implements PaymentProvider {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_API_KEY') as string,
      { apiVersion: '2024-09-30.acacia' },
    );
  }

  async processPayment(
    amount: number,
    currency: string,
    paymentMethodId: string,
  ): Promise<PaymentResult> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe uses cents
        currency: currency.toLowerCase(),
        payment_method: paymentMethodId,
        confirm: true,
      });

      return {
        success: paymentIntent.status === 'succeeded',
        transactionId: paymentIntent.id,
        status: this.mapStripeStatus(paymentIntent.status),
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
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: transactionId,
      });

      return {
        success: refund.status === 'succeeded',
        transactionId: refund.id,
        status: this.mapStripeStatus(refund.status),
      };
    } catch (error) {
      return {
        success: false,
        status: PaymentStatus.FAILED,
        error: error.message,
      };
    }
  }

  private mapStripeStatus(stripeStatus: string): PaymentStatus {
    switch (stripeStatus) {
      case 'succeeded':
        return PaymentStatus.COMPLETED;
      case 'pending':
        return PaymentStatus.PENDING;
      default:
        return PaymentStatus.FAILED;
    }
  }
}
