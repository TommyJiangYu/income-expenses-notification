import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';

import ormconfig from './ormconfig';
import { LineMessagingModule } from './line-messaging/line-messaging.module';
import { DialogflowModule } from './dialogflow/dialogflow.module';
import { ConnectionModule } from './connection/connection.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { UserModule } from './user/user.module';
import { ScheduleModule as TaskScheduleModule } from './schedule/schedule.module';
import { JobHandlerModule } from './job-handler/job-handler.module';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: env === 'development' ? '.env' : `.env.${env}`,
      load: [ormconfig],
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('ormconfig'),
    }),
    LineMessagingModule,
    DialogflowModule,
    ConnectionModule,
    UserModule,
    TaskScheduleModule,
    JobHandlerModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
