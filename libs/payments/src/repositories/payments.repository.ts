import { Payment } from '@app/db';
import { PaymentStatus } from '@app/shared';
import { Repository } from 'typeorm';

export class PaymentRepository extends Repository<Payment> {
  async createPayment(paymentData: Partial<Payment>): Promise<Payment> {
    const payment = this.create(paymentData);
    return this.save(payment);
  }

  async updatePaymentStatus(
    id: string,
    status: PaymentStatus,
    providerTransactionId?: string,
  ): Promise<Payment> {
    const payment = await this.findOne({ where: { id } });
    payment.status = status;
    if (providerTransactionId) {
      payment.providerTransactionId = providerTransactionId;
    }
    return this.save(payment);
  }
}
