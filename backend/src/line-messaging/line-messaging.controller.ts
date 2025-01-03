import { Body, Controller, Post } from '@nestjs/common';
import { LineMessagingService } from './line-messaging.service';
import { WebhookRequestBody } from '@line/bot-sdk';

@Controller('/line-messaging')
export class LineMessagingController {
  constructor(private lineMessagingService: LineMessagingService) {}

  @Post('/webhook')
  handleWebhook(@Body() body: WebhookRequestBody) {
    return this.lineMessagingService.handleLineEvents(body.events);
  }
}
