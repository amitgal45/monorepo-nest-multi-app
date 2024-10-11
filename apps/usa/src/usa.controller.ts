import { Controller, Get } from '@nestjs/common';
import { UsaService } from './usa.service';

@Controller()
export class UsaController {
  constructor(private readonly usaService: UsaService) {}

  @Get()
  getHello(): string {
    return this.usaService.getHello();
  }
}
