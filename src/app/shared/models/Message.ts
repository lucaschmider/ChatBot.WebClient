import { IMessageResponse } from "./IMessageResponse";
import { MessageType } from "./MessageType";
import { PossibleQuestionsResponse } from "./PossibleQuestionsResponse";
export class Message {
  private constructor(
    private Message: string,
    private Timestamp: Date,
    private IsIncomming: boolean,
    private MessageType: MessageType,
    private PossibleQuestions?: PossibleQuestionsResponse
  ) { }

  public getMessage(): string {
    return this.Message;
  }
  public getTimestamp(): Date {
    return this.Timestamp;
  }
  public getIsIncoming(): boolean {
    return this.IsIncomming;
  }
  public getMessageType(): MessageType {
    return this.MessageType;
  }
  public getPossibleQuestions(): PossibleQuestionsResponse {
    return this.PossibleQuestions;
  }

  public static CreateFromResponse(messageResponse: IMessageResponse): Message {
    const timestamp = new Date(messageResponse.timestamp);

    return new Message(messageResponse.message, timestamp, true, MessageType.PlainText);
  }

  public static CreateRating(text: string): Message {
    return new Message(text, new Date(), true, MessageType.Rating);
  }

  public static CreateFromText(messageText: string): Message {
    return new Message(messageText, new Date(), false, MessageType.PlainText);
  }

  public static CreateWelcomeMessage(greeting: string, possibleQuestions: PossibleQuestionsResponse) {
    return new Message(greeting, new Date(), true, MessageType.WelcomeMessage, possibleQuestions);
  }
}
