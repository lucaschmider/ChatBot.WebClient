import { Injectable, OnDestroy } from '@angular/core';
import { SharedModule } from "../shared.module";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Message } from '../models/Message';
import { BehaviorSubject, Observable, interval, of, Subscription } from 'rxjs';
import { ISendMessageRequest } from '../models/ISendMessageRequest';
import { switchMap, catchError } from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";
import { Error } from "../models/Error";

@Injectable({
  providedIn: SharedModule
})
export class MessageService implements OnDestroy {
  private static readonly baseUrl = "http://localhost:3000";
  private static readonly userId = "test-user-jashkdja";

  private messages: Message[];
  private messagesSub = new BehaviorSubject<Message[]>(this.messages);
  private subscription: Subscription;

  constructor(
    private httpClient: HttpClient
  ) {
    this.messages = [];

    const httpObservable = interval(1000).pipe(
      switchMap(() => fromFetch(`${MessageService.baseUrl}/chat`).pipe(
        switchMap(x => {
          if (x.ok) {
            return x.json();
          }
          return of({ error: true, message: `Error ${x.status}` });
        }),
        catchError(err => {
          // Network or other error, handle appropriately
          console.error(err);
          return of({ error: true, message: err.message })
        })
      ))
    );

    this.subscription = httpObservable.subscribe(data => {
      if (data instanceof Error)
        console.log(data);

      this.messages.push(...data.map(message => Message.CreateFromResponse(message)));
      this.messagesSub.next(this.messages);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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

    this.httpClient.post(`${MessageService.baseUrl}/chat`, messageBody).subscribe(() => { });
  }
}
