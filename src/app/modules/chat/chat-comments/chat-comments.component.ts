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

  private isEnd = false
  private lastSnapshot = null
  private limit = 20
  private isFirst = true

  constructor(
    private chatService: ChatService,
  ) {}

  ngOnInit() {
    this.getTexts();
    this.liveUpdate();
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
        if (doc.id === this.texts.value[0].id) {
          this.isSaving.next(false);
          return
        }

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

  private liveUpdate() {
    this.chatService.onChatChange().onSnapshot({
      next: docs => {

        // TODO
        // PLAN rozwojowy
        // 1. modyfikacja
        // 2. usuwanie
        // 3. komentarze
        // 4. wieksza przepustowość

        // TODO to tez jest pewnie chujowe i powoduje mase bledow, ale i tak nie ma teraz duzo uzytkownikow
        if (this.isLoading.value || this.isFirst) {
          this.isFirst = false;
          return
        }

        const data: ChatTextModel[] = [];

        //  TODO narazie przyjmuje tylko jeden wpis na zywo
        docs.forEach(d => {
          data.push({
            ...d.data() as ChatTextModel,
            id: d.id,
            date: (d.data() as any).date.toDate()
          });
        })

        // jesli pojawi się taka sama wiadomość to co poprzednie, czyli jesli jest modyfikacja to nic nie rób
        if (data[0].id === this.texts.value[0].id) return

        this.texts.next([data[0], ...this.texts.value])
      }
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
