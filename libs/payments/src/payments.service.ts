// src/payment/payment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentProvider } from './interfaces/payment-provider.interface';
import { PaymentRepository } from './repositories/payments.repository';
import { PaymentProvider as Provider, PaymentStatus } from '@app/shared';
import { Payment } from '@app/db';
import { UserService } from '@app/user';

@Injectable()
export class PaymentService {
  private paymentProviders: Map<Provider, PaymentProvider>;

  constructor(
    @InjectRepository(PaymentRepository)
    private paymentRepository: PaymentRepository,
    private userService: UserService,
  ) {
    this.paymentProviders = new Map();
  }

  registerPaymentProvider(
    provider: Provider,
    paymentProvider: PaymentProvider,
  ) {
    this.paymentProviders.set(provider, paymentProvider);
  }

  async processPayment(
    userId: string,
    amount: number,
    currency: string,
    provider: Provider,
    paymentMethodId: string,
  ): Promise<Payment> {
    const user = await this.userService.findById(userId);
    const paymentProvider = this.paymentProviders.get(provider);

    if (!paymentProvider) {
      throw new NotFoundException(`Payment provider ${provider} not found`);
    }

    const payment = await this.paymentRepository.createPayment({
      user,
      amount,
      currency,
      provider,
      status: PaymentStatus.PENDING,
    });

    const result = await paymentProvider.processPayment(
      amount,
      currency,
      paymentMethodId,
    );

    return this.paymentRepository.updatePaymentStatus(
      payment.id,
      result.status,
      result.transactionId,
    );
  }

  async refundPayment(paymentId: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id: paymentId },
    });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    const paymentProvider = this.paymentProviders.get(
      payment.provider as Provider,
    );
    if (!paymentProvider) {
      throw new NotFoundException(
        `Payment provider ${payment.provider} not found`,
      );
    }

    const result = await paymentProvider.refundPayment(
      payment.providerTransactionId,
    );

    return this.paymentRepository.updatePaymentStatus(
      payment.id,
      result.status,
      result.transactionId,
    );
  }

  async getPaymentById(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({ where: { id } });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async getUserPayments(userId: string): Promise<Payment[]> {
    return this.paymentRepository.find({ where: { user: { id: userId } } });
  }
}
