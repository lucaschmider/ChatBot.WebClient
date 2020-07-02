import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnDestroy {
  @Input() public isIncoming: Observable<boolean>;

  constructor() {

  }

  public ngOnDestroy(): void {

  }

}
