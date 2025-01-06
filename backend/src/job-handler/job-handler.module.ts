import { Module } from '@nestjs/common';
import { JobHandlerService } from './job-handler.service';
import { LineMessagingModule } from 'src/line-messaging/line-messaging.module';
import { ScheduleModule } from 'src/schedule/schedule.module';

@Module({
  imports: [LineMessagingModule, ScheduleModule],
  providers: [JobHandlerService],
})
export class JobHandlerModule {}
