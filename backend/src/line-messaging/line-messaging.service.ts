import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DialogflowService } from '../dialogflow/dialogflow.service';
import {
  Message,
  MessageEvent,
  messagingApi,
  TextEventMessage,
  WebhookEvent,
} from '@line/bot-sdk';
import { MessageType, PushMessage } from './types/line-messaging.type';
import { Language } from '../dialogflow/types/dialogflow.type';
import { UserService } from 'src/user/user.service';

const { MessagingApiClient } = messagingApi;

@Injectable()
export class LineMessagingService {
  private readonly messagingApiClient: messagingApi.MessagingApiClient;

  constructor(
    private readonly configService: ConfigService,
    private readonly dialogflowService: DialogflowService,
    private readonly userService: UserService,
  ) {
    this.messagingApiClient = new MessagingApiClient({
      channelAccessToken: this.configService.get('LINE_CHANNEL_ACCESS_TOKEN'),
    });
  }

  async handleLineEvents(events: WebhookEvent[]) {
    try {
      for (const event of events) {
        if (event.type === 'message') {
          await this.replyToMessage(event as MessageEvent);
        }
      }

      return { success: true };
    } catch (error) {
      console.error('Cannot get event from line because : ', error);
      throw new BadRequestException('Cannot get event from line');
    }
  }

  async replyToMessage(event: MessageEvent) {
    const eventMessage = event.message as TextEventMessage;
    const lineUserId = event.source.userId || '';

    if (!!lineUserId) {
      const lineProfile = await this.messagingApiClient.getProfile(lineUserId);
      const user = await this.userService.findByUserLineId(lineProfile.userId);

      if (!user) {
        this.userService.create({
          name: lineProfile.displayName,
          lineUserId: lineProfile.userId,
        });
      }
    }

    const result = await this.dialogflowService.detectDialogflowIntent({
      languageCode: Language.THAI,
      message: eventMessage.text,
      sessionId: event.source.userId,
    });

    const message: Message = {
      type: MessageType.TEXT,
      text: result.fulfillmentText,
    };

    this.messagingApiClient.replyMessage({
      replyToken: event.replyToken,
      messages: [message],
    });
  }

  async pushMessage(messageRequest: PushMessage) {
    await this.messagingApiClient.pushMessage({
      to: messageRequest.to,
      messages: messageRequest.messages,
    });
  }
}
