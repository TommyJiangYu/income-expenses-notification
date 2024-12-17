import { Module } from '@nestjs/common';
import { LineMessagingController } from './line-messaging.controller';
import { LineMessagingService } from './line-messaging.service';
import { DialogflowModule } from 'src/dialogflow/dialogflow.module';

@Module({
  imports: [DialogflowModule],
  controllers: [LineMessagingController],
  providers: [LineMessagingService],
})
export class LineMessagingModule {}
