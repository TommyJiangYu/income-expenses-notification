import { Test, TestingModule } from '@nestjs/testing';
import { LineMessagingService } from './line-messaging.service';

describe('LineMessagingService', () => {
  let service: LineMessagingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineMessagingService],
    }).compile();

    service = module.get<LineMessagingService>(LineMessagingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
