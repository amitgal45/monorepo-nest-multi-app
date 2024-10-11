import { Test, TestingModule } from '@nestjs/testing';
import { UsaController } from './usa.controller';
import { UsaService } from './usa.service';

describe('UsaController', () => {
  let usaController: UsaController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsaController],
      providers: [UsaService],
    }).compile();

    usaController = app.get<UsaController>(UsaController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(usaController.getHello()).toBe('Hello World!');
    });
  });
});
