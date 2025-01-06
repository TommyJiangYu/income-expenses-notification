import { Schedule } from '../schedule.entity';

export enum REPEAT_PATTERN {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export interface CreateSchedule {
  name: string;
  description: string;
  repeat_pattern?: REPEAT_PATTERN;
  reminder_time?: Date;
  is_active?: boolean;
  start_date: Date;
  end_date: Date;
}

export type UpdateSchedule = { id: number } & Partial<Schedule>;
