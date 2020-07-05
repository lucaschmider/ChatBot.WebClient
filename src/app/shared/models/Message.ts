import { IMessageResponse } from "./IMessageResponse";

export class Message {
    private constructor(
        private Message: string,
        private Timestamp: Date,
        private IsIncomming: boolean
    ) { }

    public getMessage(): string { return this.Message };
    public getTimestamp(): Date { return this.Timestamp };
    public getIsIncoming(): boolean { return this.IsIncomming };

    public static CreateFromResponse(messageResponse: IMessageResponse): Message {
        const timestamp = new Date(messageResponse.timestamp);

        return new Message(
            messageResponse.message,
            timestamp,
            true
        );
    }

    public static CreateFromText(messageText: string): Message {
        return new Message(
            messageText,
            new Date(),
            false
        );
    }
}