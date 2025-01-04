import { Module } from '@nestjs/common';
import { JobHandlerService } from './job-handler.service';
import { LineMessagingModule } from 'src/line-messaging/line-messaging.module';

@Module({
  imports: [LineMessagingModule],
  providers: [JobHandlerService],
})
export class JobHandlerModule {}
