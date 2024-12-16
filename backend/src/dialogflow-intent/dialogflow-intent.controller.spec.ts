import { Test, TestingModule } from '@nestjs/testing';
import { DialogflowIntentController } from './dialogflow-intent.controller';

describe('DialogflowIntentController', () => {
  let controller: DialogflowIntentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DialogflowIntentController],
    }).compile();

    controller = module.get<DialogflowIntentController>(DialogflowIntentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
