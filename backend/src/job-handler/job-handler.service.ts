import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class JobHandlerService {
  @Cron(CronExpression.EVERY_12_HOURS)
  async handleCron() {
    console.log('From JobHandlerService Called every 10 seconds', new Date());
  }
}
