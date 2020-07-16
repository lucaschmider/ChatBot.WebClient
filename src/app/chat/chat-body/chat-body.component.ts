import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { MessageService } from "../../shared/services/message.service";

@Component({
  selector: "app-chat-body",
  templateUrl: "./chat-body.component.html",
  styleUrls: ["./chat-body.component.scss"]
})
export class ChatBodyComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("scrollframe", { static: false }) scrollFrame: ElementRef;
  @ViewChildren("item") itemElements: QueryList<any>;

  private scrollContainer: any;
  private isNearBottom = true;
  constructor(public messageService: MessageService) {
    messageService.startSubscription();
  }
  ngOnDestroy(): void {
    this.messageService.clearSubscription();
  }

  ngOnInit(): void { }
  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe((_) => this.onItemElementsChanged());
  }

  private onItemElementsChanged(): void {
    if (this.isNearBottom) {
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: "smooth"
    });
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    return position > height - threshold;
  }

  public scrolled(event: any): void {
    this.isNearBottom = this.isUserNearBottom();
  }

  public rated(rating: number): void {
    console.log(rating);
  }
}
