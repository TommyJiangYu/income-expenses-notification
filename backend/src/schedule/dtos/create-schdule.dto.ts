import {
  IsEnum,
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { REPEAT_PATTERN } from '../types/schedule.type';

export class CreateScheduleDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(REPEAT_PATTERN)
  @IsOptional()
  repeat_pattern?: REPEAT_PATTERN;

  @IsDate()
  @IsOptional()
  reminder_time?: Date;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean = true;

  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;
}
