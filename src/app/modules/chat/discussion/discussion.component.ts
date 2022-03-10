import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatTextModel } from 'src/app/models/chat/chat-text.model';
import { showAnimation } from 'src/app/services/animations/others.animations';
import { ChatService } from 'src/app/services/collections/chat/chat.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
  animations: [showAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscussionComponent implements OnInit {
  @Input() data: ChatTextModel
  @Input() isAdmin: boolean
  @Input() isLogin: boolean
  @Input() userName: string
  @Input() idUser: string
  @Input() disableIcon: boolean = false

  @Output() deleteMe = new EventEmitter<string>()

  isSaving = new BehaviorSubject<boolean>(false)
  handleOpenWrite = new BehaviorSubject<boolean>(false)
  countAnswers = new BehaviorSubject<number>(0)
  handleOpenAnswers = new BehaviorSubject<boolean>(false)
  handleOpenWriteComment = new BehaviorSubject<boolean>(false)
  answers = new BehaviorSubject<ChatTextModel[]>([])

  constructor(
    private chatService: ChatService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.getCountAnswers();
  }

  hideAnswers() {
    this.answers.next([]);
    this.handleOpenWriteComment.next(false);
    this.handleOpenAnswers.next(false);
  }

  addAnswer(answer: ChatTextModel) {
    this.isSaving.next(true);

    const rlyChat: ChatTextModel = {
      ...answer,
      name: this.userName,
      dislikes: 0,
      likes: 0,
      parentId: this.data.id,
      isAnswer: true,
      authorId: this.idUser
    };
    console.log(rlyChat)
    this.chatService.addChat(rlyChat).subscribe({
      next: () => {
        this.answers.next([ rlyChat, ...this.answers.value]);
        this.countAnswers.next(this.countAnswers.value + 1);
        this.isSaving.next(false);
      },
      error: () => {
        this.isSaving.next(false);
      }
    })
  }

  getAnswers() {
    this.chatService.getAnswers(this.data.id).subscribe({
      next: docs => {
        let data: ChatTextModel[] = [];

        docs.forEach(doc => data.push({ ...doc.data() as ChatTextModel, date: (doc.data() as any).date.toDate(), id: doc.id }));

        this.answers.next(data);
        this.handleOpenAnswers.next(true);
      },
    })
  }

  handleDeleteAnswer(id: string) {
    this.chatService.deteleMe(id).subscribe({
      next: () => {
        this.answers.next(this.answers.value.filter(filterV => filterV.id !== id));
      },
    })
  }

  handleLike(value: number) {
    this.data.likes = this.data.likes + value;
    this.data.likes = isNaN(this.data.likes) ? 1 : this.data.likes;
    this.changeDetectorRef.detectChanges();
  }

  handleDislike(value: number) {
    this.data.dislikes = this.data.dislikes + value;
    this.data.dislikes = isNaN(this.data.dislikes) ? 1 : this.data.dislikes;
    this.changeDetectorRef.detectChanges();
  }

  private getCountAnswers() {
    this.chatService.getAnswers(this.data.id).subscribe({
      next: docs => {
        this.countAnswers.next(docs.size);
      },
    })
  }
}
