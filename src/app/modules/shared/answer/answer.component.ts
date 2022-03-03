import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';
import { ChatService } from 'src/app/services/collections/chat/chat.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() data: CommentModel
  @Input() isAdmin: boolean
  @Input() isLogin: boolean

  @Output() deleteAnswer = new EventEmitter<string>()

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private chatService: ChatService,
  ) {}

  answers = new BehaviorSubject<CommentModel[]>([])
  commentMode = new BehaviorSubject<'like' | 'dislike' | null>(null)
  handleOpenAnswers = new BehaviorSubject<boolean>(false)

  ngOnInit() {
    if (localStorage.getItem(this.data.id) === 'like')
      this.commentMode.next('like');
    else if (localStorage.getItem(this.data.id) === 'dislike')
      this.commentMode.next('dislike');
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
        this.data.likes = this.data?.likes + value;
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
        this.data.dislikes = this.data?.dislikes + value;
        this.data.dislikes = isNaN(this.data.dislikes) ? 1 : this.data.dislikes;
        this.changeDetectorRef.detectChanges();
      },
    })
  }
}
