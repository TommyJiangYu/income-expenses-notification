import { Injectable } from '@nestjs/common';
import { messagingApi } from '@line/bot-sdk';

@Injectable()
export class LineMessagingService {
  getMessageFromLine() {
    return { message: 'from line' };
  }
}
