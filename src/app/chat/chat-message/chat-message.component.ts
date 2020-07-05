import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from "../../shared/models/Message";
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnDestroy {
  @Input() public message: Message;
  constructor() {
  }

  public ngOnDestroy(): void {

  }

}
