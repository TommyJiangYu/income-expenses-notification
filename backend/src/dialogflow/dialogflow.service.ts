import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SessionsClient, protos } from '@google-cloud/dialogflow';
import { ConfigService } from '@nestjs/config';
import {
  DetectDialogflowIntentResponse,
  DialogflowEvent,
} from './types/dialogflow.type';

@Injectable()
export class DialogflowService {
  private client: SessionsClient;
  private projectId: string;

  constructor(private readonly configService: ConfigService) {
    this.client = new SessionsClient();
    this.projectId = this.configService.get('GOOGLE_CLOUD_PROJECT_ID');
  }

  async detectDialogflowIntent(
    event: DialogflowEvent,
  ): Promise<DetectDialogflowIntentResponse> {
    const sessionPath = this.client.projectAgentSessionPath(
      this.projectId,
      event.sessionId,
    );

    const request: protos.google.cloud.dialogflow.v2.IDetectIntentRequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text: event.message,
          languageCode: event.languageCode,
        },
      },
    };

    try {
      const [response] = await this.client.detectIntent(request);
      const result = response.queryResult;

      return {
        fulfillmentText: result.fulfillmentText,
      };
    } catch (error) {
      console.error('Error during detectIntent call:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve response from Dialogflow',
      );
    }
  }
}
