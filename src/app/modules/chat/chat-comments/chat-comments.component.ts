import { ChangeDetectionStrategy, Component, HostListener, Input, OnInit } from '@angular/core';
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
  @Input() isAdmin: string
  @Input() isLogin: boolean
  @Input() isCheckingLogin: boolean

  isSaving = new BehaviorSubject<boolean>(false)
  texts = new BehaviorSubject<ChatTextModel[]>([])
  isLoading = new BehaviorSubject<boolean>(false)

  isEnd = false
  lastSnapshot = null
  limit = 20

  constructor(
    private chatService: ChatService,
  ) {}

  ngOnInit() {
    this.getTexts();
  }

  @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      this.more();
    }

  // TODO create page
  getTexts() {
    this.isLoading.next(true);

    this.chatService.getDiscussions(this.limit + 1, this.lastSnapshot).subscribe({
      next: docs => {
        const data: ChatTextModel[] = [];
        let i = 0

        docs.forEach(d => {
          i++;

          data.push({
            ...d.data() as ChatTextModel,
            id: d.id,
            date: (d.data() as any).date.toDate()
          });

          if (this.limit === i) this.lastSnapshot = d;
        })

        if (data.length === this.limit + 1) {
          data.pop();
        } else {
          this.isEnd = true;
        }

        this.texts.next([...this.texts.value, ...data,]);
        this.isLoading.next(false);
      },
      error: err => {
        console.log(err)
        this.isLoading.next(false);
      },
    })
  }

  addText(text: ChatTextModel) {
    this.isSaving.next(true);

    const rlyChat: ChatTextModel = {
      ...text,
      name: this.userName,
      dislikes: 0,
      likes: 0,
      isAnswer: false,
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

  handleDelete(id: string) {
    this.chatService.deteleMe(id).subscribe({
      next: () => {
        this.texts.next(this.texts.value.filter(filterV => filterV.id !== id));
      },
    })
  }

  private more() {
    if (this.isLoading.value || this.isEnd) return

    const docElem = document.documentElement,
        docBody = document.body,
        scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
        scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
        scrollPercent = scrollTop / scrollBottom * 100;

    if (scrollPercent >= 80) {
      this.getTexts();
    }
  }
}
