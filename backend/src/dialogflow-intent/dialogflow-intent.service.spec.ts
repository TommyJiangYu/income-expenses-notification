import { Test, TestingModule } from '@nestjs/testing';
import { DialogflowIntentService } from './dialogflow-intent.service';

describe('DialogflowIntentService', () => {
  let service: DialogflowIntentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DialogflowIntentService],
    }).compile();

    service = module.get<DialogflowIntentService>(DialogflowIntentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
