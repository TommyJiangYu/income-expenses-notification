import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CronJob } from 'cron';
import { OnEvent } from '@nestjs/event-emitter';
import { Schedule } from 'src/schedule/schedule.entity';
import { ScheduleService } from 'src/schedule/schedule.service';
import generateCronExpression from './utils/generateCronExpression';
import { LineMessagingService } from 'src/line-messaging/line-messaging.service';
import { Message } from '@line/bot-sdk';

@Injectable()
export class JobHandlerService implements OnModuleInit, OnModuleDestroy {
  private jobs: Record<number, CronJob> = {};

  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly lineMessagingService: LineMessagingService,
  ) {}

  async onModuleInit() {
    const schedules = await this.scheduleService.findActive();
    schedules.forEach((schedule) => this.cronjobHandler(schedule));
  }

  onModuleDestroy() {
    Object.values(this.jobs).forEach((job) => job.stop());
  }

  // ต้องมี Handle จังหวะ update / delete ด้วยนะ
  @OnEvent('schedule.created')
  async handleCreateNewJob(schedule: Schedule) {
    if (schedule && schedule.is_active) {
      this.cronjobHandler(schedule);
    }
  }

  private cronjobHandler(schedule: Schedule) {
    const cronExpression = generateCronExpression({
      reminderTime: schedule.reminder_time,
      repeatPattern: schedule.repeat_pattern,
    });

    if (this.jobs[schedule.id]) {
      this.jobs[schedule.id].stop();
    }

    const job = new CronJob(cronExpression, () => {
      // const textMessage: Message = {
      //   type: 'text',
      //   text:
      //     schedule.description +
      //     'ซึ่งตอนนี้เวลา : ' +
      //     schedule.reminder_time.toLocaleString(),
      // };

      // this.lineMessagingService.pushMessage({
      //   to: '',
      //   messages: [textMessage],
      // });

      console.log(
        `Reminder for Schedule ID: ${schedule.id} description: ${schedule.description} triggered at ${new Date()}`,
      );
    });

    job.start();
    this.jobs[schedule.id] = job;
  }
}
