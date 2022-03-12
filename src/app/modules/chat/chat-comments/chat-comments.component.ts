import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';
import { ChatTextModel } from 'src/app/models/chat/chat-text.model';
import { showAnimation } from 'src/app/services/animations/others.animations';
import { ChatService } from 'src/app/services/collections/chat/chat.service';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-chat-comments',
  templateUrl: './chat-comments.component.html',
  styleUrls: ['./chat-comments.component.scss'],
  host: {
    class: 'col-12 col-md-10 col-lg-8 col-xl-6'
  },
  animations: [showAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatCommentsComponent implements OnInit {
  isSaving = new BehaviorSubject<boolean>(false)
  texts = new BehaviorSubject<ChatTextModel[]>([])
  isLoading = new BehaviorSubject<boolean>(false)
  order = new BehaviorSubject<OrderEnum>(OrderEnum.Latest)

  time = new FormControl(moment().subtract(1, 'days').toDate())

  private isEnd = false
  private lastSnapshot = null
  private limit = 20
  private isFirst = true

  constructor(
    private chatService: ChatService,
    private userService: UserService,
  ) {}

  get userName() {
    return this.userService.userName
  }

  get isAdmin() {
    return this.userService.isAdmin
  }

  get isLogin() {
    return this.userService.isLogin
  }

  get idUser() {
    return this.userService.idUser
  }

  ngOnInit() {
    this.getTexts(OrderEnum.Latest, false);
    this.liveUpdate();
  }

  @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      this.more();
    }

  getTexts(order: OrderEnum, isMore: boolean, date = this.time.value) {
    this.isLoading.next(true);

    if (order && !isMore) {
      this.order.next(order);
      this.texts.next([]);
      this.lastSnapshot = null;
      this.isEnd = false;
    }

    this.chatService.getDiscussions(this.limit + 1, this.lastSnapshot, order, date).subscribe({
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
      error: () => {
        this.isLoading.next(false);
      },
    })
  }

  addText(text: ChatTextModel) {
    this.isSaving.next(true);

    const rlyChat: ChatTextModel = {
      ...text,
      name: this.userName.value,
      dislikes: 0,
      likes: 0,
      isAnswer: false,
      authorId: this.idUser.value,
      countAnswers: 0,
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
    this.time.valueChanges.subscribe(value => {
      if (this.isFirst) return

      this.getTexts(this.order.value, false, value);
    })

    this.chatService.onChatChange().onSnapshot({
      next: docs => {

        // TODO
        // PLAN rozwojowy
        // 3. komentarze
        // 4. wieksza przepustowość

        // TODO to tez jest pewnie glupe :D i powoduje mase bledow, ale i tak nie ma teraz duzo uzytkownikow
        if (this.isLoading.value || this.isFirst || this.order.value === OrderEnum.Popular) {
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
      this.getTexts(this.order.value, true);
    }
  }
}
