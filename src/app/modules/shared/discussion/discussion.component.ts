import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatTextModel } from 'src/app/models/chat/chat-text.model';
import { ChatService } from 'src/app/services/collections/chat/chat.service';

type CommetingType = 'like' | 'dislike' | null;

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscussionComponent implements OnInit {
  @Input() data: ChatTextModel
  @Input() isAdmin: boolean
  @Input() isLogin: boolean
  @Input() userName: string

  @Output() deleteMe = new EventEmitter<string>()

  isSaving = new BehaviorSubject<boolean>(false)
  handleOpenWrite = new BehaviorSubject<boolean>(false)
  commentMode = new BehaviorSubject<CommetingType>(null)
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
      isAnswer: true
    };

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

  approve(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.commentMode.value === 'like' || forceMinus) {
      if (this.commentMode.value === 'like') localStorage.removeItem(this.data.id);
      value = -1;
      this.commentMode.next(null);
    } else {
      if (this.commentMode.value === 'dislike') this.dislike(true);
      this.commentMode.next('like');
      localStorage.setItem(this.data.id, 'like');
      value = 1;
    }

    this.chatService.updateLikes(this.data.id, value).subscribe({
      next: () => {
        this.data.likes = this.data.likes + value;
        this.data.likes = isNaN(this.data.likes) ? 1 : this.data.likes;
        this.changeDetectorRef.detectChanges();
      },
    })
  }

  dislike(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.commentMode.value === 'dislike' || forceMinus) {
      if (this.commentMode.value === 'dislike') localStorage.removeItem(this.data.id);
      value = -1;
      this.commentMode.next(null);
    } else {
      if (this.commentMode.value === 'like') this.approve(true);
      this.commentMode.next('dislike');
      localStorage.setItem(this.data.id, 'dislike');
      value = 1;
    }

    this.chatService.updateDislikes(this.data.id, value).subscribe({
      next: () => {
        this.data.dislikes = this.data.dislikes + value;
        this.data.dislikes = isNaN(this.data.dislikes) ? 1 : this.data.dislikes;
        this.changeDetectorRef.detectChanges();
      },
    })
  }

  private getCountAnswers() {
    this.chatService.getAnswers(this.data.id).subscribe({
      next: docs => {
        this.countAnswers.next(docs.size);
      },
    })
  }
}
