import { Component, OnInit } from '@angular/core';
import { MessageService } from "../../shared/services/message.service";

@Component({
  selector: 'app-chat-body',
  templateUrl: './chat-body.component.html',
  styleUrls: ['./chat-body.component.scss']
})
export class ChatBodyComponent implements OnInit {

  constructor(
    public messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

}
