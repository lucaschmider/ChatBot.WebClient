import { Component, OnInit, HostListener } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MessageService } from "src/app/shared/services/message.service";

@Component({
  selector: "app-chat-controls",
  templateUrl: "./chat-controls.component.html",
  styleUrls: ["./chat-controls.component.scss"]
})
export class ChatControlsComponent implements OnInit {
  public messageFormControl = new FormControl("", Validators.required);

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  public sendMessage(): void {
    this.messageService.sendMessage(this.messageFormControl.value);
    this.messageFormControl.patchValue("");
  }
}
