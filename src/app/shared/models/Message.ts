import { IMessageResponse } from "./IMessageResponse";

export class Message {
    private constructor(
        private Message: string,
        private Timestamp: Date,
        private IsIncomming: boolean
    ) { }

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