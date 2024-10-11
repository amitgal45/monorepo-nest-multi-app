import { NestFactory } from '@nestjs/core';
import { IsrModule } from './isr.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(IsrModule);

  await app.listen(3030);
}
bootstrap();
