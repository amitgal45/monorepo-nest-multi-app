import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule as BaseAuthModule } from '@app/auth';
import { AnalyticsModule } from '@app/analytics';

@Module({
  imports: [BaseAuthModule, AnalyticsModule],
  controllers: [AuthController],
})
export class AuthModule {}
