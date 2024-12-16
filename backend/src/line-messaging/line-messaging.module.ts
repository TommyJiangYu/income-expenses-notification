import { Module } from '@nestjs/common';
import { LineMessagingController } from './line-messaging.controller';
import { LineMessagingService } from './line-messaging.service';

@Module({
  controllers: [LineMessagingController],
  providers: [LineMessagingService]
})
export class LineMessagingModule {}
