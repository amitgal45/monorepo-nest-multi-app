import { PaymentStatus } from '@app/shared';

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  status: PaymentStatus;
  error?: string;
}

export interface PaymentProvider {
  processPayment(
    amount: number,
    currency: string,
    paymentMethodId: string,
  ): Promise<PaymentResult>;
  refundPayment(transactionId: string): Promise<PaymentResult>;
}
