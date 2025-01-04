import { Message } from '@line/bot-sdk/dist/messaging-api/api';

export enum MessageType {
  TEXT = 'text',
}

export interface PushMessage {
  to: string;
  messages: Message[];
}
