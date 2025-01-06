import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dtos/create-schdule.dto';
import { UpdateScheduleDto } from './dtos/update-schedule.dto';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  async findSchedules() {
    return await this.scheduleService.find();
  }

  @Get('/:id')
  async findSchedule(@Param('id') id: string) {
    return await this.scheduleService.findOne(Number(id));
  }

  @Post()
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return await this.scheduleService.create({ ...createScheduleDto });
  }

  @Put('/:id')
  async updateSchedule(
    @Param('id') id: string,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ) {
    return await this.scheduleService.update({
      id: Number(id),
      ...updateScheduleDto,
    });
  }

  @Delete('/:id')
  async deleteSchedule(@Param('id') id: string) {
    return await this.scheduleService.remove(Number(id));
  }
}
