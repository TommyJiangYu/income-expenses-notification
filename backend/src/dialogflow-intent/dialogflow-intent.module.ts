import { Module } from '@nestjs/common';
import { DialogflowIntentController } from './dialogflow-intent.controller';
import { DialogflowIntentService } from './dialogflow-intent.service';

@Module({
  controllers: [DialogflowIntentController],
  providers: [DialogflowIntentService]
})
export class DialogflowIntentModule {}
