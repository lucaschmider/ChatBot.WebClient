import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { Message } from "../../shared/models/Message";
import { MessageService } from "src/app/shared/services/message.service";

@Component({
  selector: "app-chat-message",
  templateUrl: "./chat-message.component.html",
  styleUrls: ["./chat-message.component.scss"]
})
export class ChatMessageComponent implements OnDestroy {
  @Input() public message: Message;
  @Output() public userInteract = new EventEmitter<number | void>();

  public hideRating = false;
  constructor() { }

  public ngOnDestroy(): void { }

  public messageRated(rating: number): void {
    this.userInteract.next(rating);
    this.hideRating = true;
  }
}
