import { Injectable } from '@nestjs/common';

@Injectable()
export class IsrService {
  getHello(): string {
    return 'Hello World!';
  }
}
