import { Controller, Get } from '@nestjs/common';
import { IsrService } from './isr.service';

@Controller()
export class IsrController {
  constructor(private readonly isrService: IsrService) {}

  @Get()
  getHello(): string {
    return this.isrService.getHello();
  }
}
