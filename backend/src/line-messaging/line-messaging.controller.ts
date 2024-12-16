import { Controller, Get } from '@nestjs/common';
import { LineMessagingService } from './line-messaging.service';

@Controller('/line-messaging')
export class LineMessagingController {
  constructor(private lineMessagingService: LineMessagingService) {}
  @Get('/webhook')
  getWebhookResponse() {
    return this.lineMessagingService.getMessageFromLine();
  }
}
