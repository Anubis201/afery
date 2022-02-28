import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatTextModel } from 'src/app/models/chat/chat-text.model';
import { ChatService } from 'src/app/services/collections/chat/chat.service';

@Component({
  selector: 'app-chat-comments',
  templateUrl: './chat-comments.component.html',
  styleUrls: ['./chat-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatCommentsComponent implements OnInit {
  @Input() userName: string

  isSaving = new BehaviorSubject<boolean>(false)
  texts = new BehaviorSubject<ChatTextModel[]>([])
  isLoading = new BehaviorSubject<boolean>(false)

  constructor(
    private chatService: ChatService,
  ) {}

  ngOnInit() {
    this.getTexts();
  }

  // TODO create page
  getTexts() {
    this.isLoading.next(true);

    this.chatService.getDiscussions().subscribe({
      next: docs => {
        const data: ChatTextModel[] = [];

        docs.forEach(d => {
          data.push({
            ...d.data() as ChatTextModel,
            id: d.id,
            date: (d.data() as any).date.toDate()
          });
        })

        this.texts.next(data);
        this.isLoading.next(false);
      },
      error: () => {
        this.isLoading.next(false);
      },
    })
  }

  addText(text: ChatTextModel) {
    this.isSaving.next(true);

    const rlyChat: ChatTextModel = {
      ...text,
      name: this.userName,
    };

    this.chatService.addChat(rlyChat).subscribe({
      next: doc => {
        this.texts.next([{ ...rlyChat, id: doc.id }, ...this.texts.value]);
        this.isSaving.next(false);
      },
      error: () => {
        this.isSaving.next(false);
      },
    })
  }
}
