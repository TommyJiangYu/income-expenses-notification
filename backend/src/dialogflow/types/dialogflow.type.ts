export interface DialogflowEvent {
  sessionId: string;
  message: string;
  languageCode: string;
}

export interface DetectDialogflowIntentResponse {
  fulfillmentText: string;
}

export enum Language {
  THAI = 'th',
  ENGLISH = 'en',
}
