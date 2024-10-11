import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripePaymentStrategy } from './strategies/stripe-payment.strategy';
import { PayPalPaymentStrategy } from './strategies/paypal-payment.strategy';
import { PaymentService } from './payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentRepository } from './repositories/payments.repository';
import { UserModule } from '@app/user';
import { PaymentProvider } from '@app/shared';

@Module({})
export class PaymentModule {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly stripePaymentStrategy: StripePaymentStrategy,
    private readonly paypalPaymentStrategy: StripePaymentStrategy,
  ) {}

  static forRoot(): DynamicModule {
    return {
      module: PaymentModule,
      imports: [
        UserModule,
        ConfigModule,
        TypeOrmModule.forFeature([PaymentRepository]),
      ],
      providers: [
        ConfigService,
        StripePaymentStrategy,
        PayPalPaymentStrategy,
        PaymentService,
      ],
      exports: [PaymentService],
    };
  }

  onModuleInit() {
    this.paymentService.registerPaymentProvider(
      PaymentProvider.STRIPE,
      this.stripePaymentStrategy,
    );

    this.paymentService.registerPaymentProvider(
      PaymentProvider.PAYPAL,
      this.paypalPaymentStrategy,
    );
  }
}
