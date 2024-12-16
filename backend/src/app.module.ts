import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DialogflowIntentModule } from './dialogflow-intent/dialogflow-intent.module';
import { LineMessagingModule } from './line-messaging/line-messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DialogflowIntentModule,
    LineMessagingModule,
  ],
})
export class AppModule {}
