import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LineMessagingModule } from './line-messaging/line-messaging.module';
import { DialogflowModule } from './dialogflow/dialogflow.module';
import { ConnectionModule } from './connection/connection.module';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';

const env = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: env === 'development' ? '.env' : `.env.${env}`,
      load: [ormconfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config) => config.get('ormconfig'),
    }),
    LineMessagingModule,
    DialogflowModule,
    ConnectionModule,
    UserModule,
    ScheduleModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
