import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {
  @Input() data: CommentModel
  @Input() isAdmin: boolean
  @Input() isChat: boolean

  @Output() deleteAnswer = new EventEmitter<string>()

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  answers = new BehaviorSubject<CommentModel[]>([])
  handleOpenAnswers = new BehaviorSubject<boolean>(false)

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
}
