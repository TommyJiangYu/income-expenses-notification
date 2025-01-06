import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Schedule } from 'src/schedule/schedule.entity';
import { ScheduleService } from 'src/schedule/schedule.service';
import generateCronExpression from './utils/generateCronExpression';

@Injectable()
export class JobHandlerService implements OnModuleInit, OnModuleDestroy {
  private jobs: Record<number, CronJob> = {};

  constructor(private readonly scheduleService: ScheduleService) {}

  async onModuleInit() {
    const schedules = await this.scheduleService.findActive();
    schedules.forEach((schedule) => this.cronjobHandler(schedule));
  }

  onModuleDestroy() {
    Object.values(this.jobs).forEach((job) => job.stop());
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
      console.log(
        `Reminder for Schedule ID: ${schedule.id} description: ${schedule.description} triggered at ${new Date()}`,
      );
    });

    job.start();
    this.jobs[schedule.id] = job;
  }
}
