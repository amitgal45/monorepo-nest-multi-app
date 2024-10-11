import { Test, TestingModule } from '@nestjs/testing';
import { IsrController } from './isr.controller';
import { IsrService } from './isr.service';

describe('IsrController', () => {
  let isrController: IsrController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IsrController],
      providers: [IsrService],
    }).compile();

    isrController = app.get<IsrController>(IsrController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(isrController.getHello()).toBe('Hello World!');
    });
  });
});
