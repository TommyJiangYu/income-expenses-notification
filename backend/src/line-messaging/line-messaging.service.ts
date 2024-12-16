import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Message,
  MessageEvent,
  messagingApi,
  WebhookEvent,
} from '@line/bot-sdk';
const { MessagingApiClient } = messagingApi;

@Injectable()
export class LineMessagingService {
  configService: ConfigService;
  private client: messagingApi.MessagingApiClient;

  constructor(configService: ConfigService) {
    this.configService = configService;
    this.client = new MessagingApiClient({
      channelAccessToken: configService.get('LINE_CHANNEL_ACCESS_TOKEN'),
    });
  }

  async getEventFromLine(events: WebhookEvent[]) {
    events.map((eventItem: MessageEvent) => {
      if (eventItem.type !== 'message') {
        return null;
      }
      this.replyMessage(eventItem);
    });

    return { success: true };
  }

  replyMessage(event: MessageEvent) {
    const message: Message = {
      type: 'text',
      text: 'เกียกำลังเขียน Nest อยู่ ไม่ว่าง...',
    };

    this.client.replyMessage({
      replyToken: event.replyToken,
      messages: [message],
    });
  }
}
