import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LineMessagingModule } from './line-messaging/line-messaging.module';
import { DialogflowModule } from './dialogflow/dialogflow.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    LineMessagingModule,
    DialogflowModule,
  ],
})
export class AppModule {}
