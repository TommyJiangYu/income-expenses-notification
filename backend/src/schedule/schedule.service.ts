import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSchedule, UpdateSchedule } from './types/schedule.type';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule) private readonly repo: Repository<Schedule>,
  ) {}

  async create(scheduleInfo: CreateSchedule) {
    const schedule = this.repo.create({ ...scheduleInfo });

    return this.repo.save(schedule);
  }

  async findOne(id: number) {
    const schedule = await this.repo.findOne({ where: { id } });

    if (!schedule) {
      throw new NotFoundException('Schedule not found');
    }

    return schedule;
  }

  async find() {
    const schedules = await this.repo.find();

    return schedules;
  }

  async findActive() {
    const schedules = await this.repo.find({ where: { is_active: true } });

    return schedules;
  }

  async update(updateScheduleInfo: UpdateSchedule) {
    const selectedSchedule = await this.findOne(updateScheduleInfo.id);

    Object.assign(selectedSchedule, updateScheduleInfo);

    return this.repo.save(selectedSchedule);
  }

  async remove(id: number) {
    const selectedSchedule = await this.findOne(id);

    return this.repo.remove(selectedSchedule);
  }
}
