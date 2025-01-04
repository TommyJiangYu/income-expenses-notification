import { Module } from '@nestjs/common';
import { LineMessagingController } from './line-messaging.controller';
import { LineMessagingService } from './line-messaging.service';
import { DialogflowModule } from 'src/dialogflow/dialogflow.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DialogflowModule, UserModule],
  controllers: [LineMessagingController],
  providers: [LineMessagingService],
  exports: [LineMessagingService],
})
export class LineMessagingModule {}
