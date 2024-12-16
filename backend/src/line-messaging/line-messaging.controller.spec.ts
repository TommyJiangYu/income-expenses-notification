import { Test, TestingModule } from '@nestjs/testing';
import { LineMessagingController } from './line-messaging.controller';

describe('LineMessagingController', () => {
  let controller: LineMessagingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LineMessagingController],
    }).compile();

    controller = module.get<LineMessagingController>(LineMessagingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
