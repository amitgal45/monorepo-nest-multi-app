import { NestFactory } from '@nestjs/core';
import { UsaModule } from './usa.module';

async function bootstrap() {
  const app = await NestFactory.create(UsaModule);
  await app.listen(3031);
}
bootstrap();
