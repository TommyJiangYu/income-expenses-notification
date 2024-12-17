import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { LineMessagingService } from './line-messaging.service';
import { WebhookRequestBody } from '@line/bot-sdk';

@Controller('/line-messaging')
export class LineMessagingController {
  constructor(private lineMessagingService: LineMessagingService) {}

  @Get('/test-connection')
  testConnection() {
    return {
      status: 200,
      message: 'test connection successful',
    };
  }

  @Post('/webhook')
  handleWebhook(@Body() body: WebhookRequestBody) {
    return this.lineMessagingService.handleLineEvents(body.events);
  }
}
