import { Module } from '@nestjs/common';
import { UsaController } from './usa.controller';
import { UsaService } from './usa.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
  ],
  controllers: [UsaController],
  providers: [UsaService],
})
export class UsaModule {}
