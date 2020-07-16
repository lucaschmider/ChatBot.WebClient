import { IMessageResponse } from "./IMessageResponse";
import { MessageType } from "./MessageType";

export class Message {
  private constructor(private Message: string, private Timestamp: Date, private IsIncomming: boolean, private MessageType: MessageType) { }

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

  public static CreateFromResponse(messageResponse: IMessageResponse): Message {
    const timestamp = new Date(messageResponse.timestamp);

    return new Message(messageResponse.message, timestamp, true, MessageType.PlainText);
  }

  public static CreateRating(): Message {
    return new Message("Waren meine Antworten hilfreich?", new Date(), true, MessageType.Rating);
  }

  public static CreateFromText(messageText: string): Message {
    return new Message(messageText, new Date(), false, MessageType.PlainText);
  }
}
