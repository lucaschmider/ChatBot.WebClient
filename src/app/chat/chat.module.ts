import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChatRoutingModule } from "./chat-routing.module";
import { ChatMainComponent } from "./chat-main/chat-main.component";
import { ChatBodyComponent } from "./chat-body/chat-body.component";
import { ChatMessageComponent } from "./chat-message/chat-message.component";
import { ChatControlsComponent } from "./chat-controls/chat-controls.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ChatMainComponent, ChatBodyComponent, ChatMessageComponent, ChatControlsComponent],
  imports: [CommonModule, SharedModule, ChatRoutingModule]
})
export class ChatModule {}
