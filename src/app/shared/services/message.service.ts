import { Injectable, OnDestroy } from "@angular/core";
import { SharedModule } from "../shared.module";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Message } from "../models/Message";
import { BehaviorSubject, Observable, interval, of, Subscription } from "rxjs";
import { ISendMessageRequest } from "../models/ISendMessageRequest";
import { switchMap, catchError, flatMap } from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";
import { Error } from "../models/Error";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";
import { PossibleQuestionsResponse } from "../models/PossibleQuestionsResponse";
import { TranslatePipe } from "@ngx-translate/core";

@Injectable({
  providedIn: SharedModule
})
export class MessageService implements OnDestroy {
  private messages: Message[];
  private messagesSub = new BehaviorSubject<Message[]>(this.messages);
  private httpObservable: Observable<any>;
  private subscription: Subscription;

  constructor(private httpClient: HttpClient, private authService: AuthService, private translatePipe: TranslatePipe) {
    this.messages = [];

    this.httpObservable = interval(1000).pipe(
      switchMap(async () => {
        const accessToken = await this.authService.getIdToken();
        const httpHeaders = new Headers({
          Authorization: `Bearer ${accessToken}`
        });
        return fromFetch(`${environment.backendApi}/chat`, { headers: httpHeaders }).pipe(
          switchMap((x) => {
            if (x.ok) {
              return x.json();
            }
            return of({ error: true, message: `Error ${x.status}` });
          }),
          catchError((err) => {
            console.error(err);
            return of({ error: true, message: err.message });
          })
        );
      }),
      flatMap((value) => value)
    );
  }

  public startSubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.httpObservable.subscribe((data) => {
      if (data instanceof Error) console.log(data);

      data.forEach((message) => {
        this.messages.push(Message.CreateFromResponse(message));

        if (message.conversationFinished) {
          const callToAction = this.translatePipe.transform("CHAT.RATING.CALL_TO_ACTION");
          this.messages.push(Message.CreateRating(callToAction));
        }
      });

      this.messagesSub.next(this.messages);
    });
  }

  public clearSubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = null;
    this.messages = [];
    this.messagesSub.next(this.messages);
  }

  ngOnDestroy(): void {
    this.clearSubscription();
  }

  public getMessages(): Observable<Message[]> {
    return this.messagesSub.asObservable();
  }

  public async sendMessage(message: string): Promise<void> {
    this.messages.push(Message.CreateFromText(message));
    this.messagesSub.next(this.messages);

    const messageBody: ISendMessageRequest = {
      message: message
    };

    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    this.httpClient.post(`${environment.backendApi}/chat`, messageBody, { headers: httpHeaders }).subscribe(() => {});
  }

  public async createWelcomeMessage(): Promise<void> {
    const accessToken = await this.authService.getIdToken();
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    this.httpClient
      .get<PossibleQuestionsResponse>(`${environment.backendApi}/chat/questions`, { headers: httpHeaders })
      .subscribe((possibleQuestions) => {
        console.log(possibleQuestions);
        const greeting = this.translatePipe.transform("CHAT.WELCOME.GREETING");
        this.messages.push(Message.CreateWelcomeMessage(greeting, possibleQuestions));
        this.messagesSub.next(this.messages);
      });
  }
}
