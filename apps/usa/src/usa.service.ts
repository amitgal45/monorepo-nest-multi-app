import { Injectable } from '@nestjs/common';

@Injectable()
export class UsaService {
  getHello(): string {
    return 'Hello World!';
  }
}
