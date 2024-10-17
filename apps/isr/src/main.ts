import { NestFactory } from '@nestjs/core';
import { IsrModule } from './isr.module';
import { AnalyticsInterceptor } from '@app/analytics';

async function bootstrap() {
  const app = await NestFactory.create(IsrModule);

  const analyticsInterceptor = app.get(AnalyticsInterceptor);
  app.useGlobalInterceptors(analyticsInterceptor);

  await app.listen(3030);
}
bootstrap();
