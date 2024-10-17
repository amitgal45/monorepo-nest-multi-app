import { Module } from '@nestjs/common';
import { IsrController } from './isr.controller';
import { IsrService } from './isr.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@app/db';
import { PaymentModule } from '@app/payments';
import { UserModule } from '@app/user';
import * as path from 'path';
import { validationSchema } from './config/validationSchema';
import { AuthModule } from './auth/auth.module';
import { AuthModule as BaseAuthModule } from '@app/auth';
import { AnalyticsModule } from '@app/analytics';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? undefined
          : path.resolve(process.cwd(), 'apps/isr/.env'),
      isGlobal: true,
      validationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      // Load environment variables from process.env by default
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    DbModule,
    PaymentModule.forRoot(),
    UserModule,
    BaseAuthModule,
    AuthModule,
    AnalyticsModule.forRootAsync(),
  ],
  controllers: [IsrController],
  providers: [IsrService],
})
export class IsrModule {}
