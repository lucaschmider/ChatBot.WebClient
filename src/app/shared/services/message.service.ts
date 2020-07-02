import { Injectable, OnDestroy } from '@angular/core';
import { SharedModule } from "../shared.module";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from '../models/Message';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IMessageResponse } from '../models/IMessageResponse';
import { ISendMessageRequest } from '../models/ISendMessageRequest';

@Injectable({
  providedIn: SharedModule
})
export class MessageService implements OnDestroy {
  private static readonly baseUrl = "http://localhost:3000";
  private static readonly userId = "test-user-jashkdja";

  private timeout: NodeJS.Timeout;
  private messages: Message[];
  private messagesSub = new BehaviorSubject<Message[]>([]);
  private httpHeaders: HttpHeaders;

  constructor(
    private httpClient: HttpClient
  ) {
    this.httpHeaders = new HttpHeaders();
    this.httpHeaders.set("Authorization", MessageService.userId);

    this.timeout = setInterval(this.refreshMessages, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timeout);
  }

  public getMessages(): Observable<Message[]> {
    return this.messagesSub.asObservable();
  }

  public async sendMessage(message: string): Promise<void> {
    this.messages.push(Message.CreateFromText(message));
    this.messagesSub.next(this.messages);

    const messageBody: ISendMessageRequest = {
      message: message,
      userId: MessageService.userId
    };

    return this.httpClient.post<void>(`${MessageService.baseUrl}/chat`, messageBody, {
      headers: this.httpHeaders
    }).toPromise();
  }

  private async refreshMessages(): Promise<void> {
    const response = await this.httpClient.get<IMessageResponse[]>(`${MessageService.baseUrl}/chat`, {
      headers: this.httpHeaders
    }).toPromise();

    this.messages.push(...response.map(message => Message.CreateFromResponse(message)));
    this.messagesSub.next(this.messages);
  }
}
