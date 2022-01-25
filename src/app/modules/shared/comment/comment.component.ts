import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentModel
  @Input() isAdmin: boolean
  @Input() isMenagaComponent: boolean = false

  @Output() deleteComment = new EventEmitter<string>()

  constructor(private commentsService: CommentsService) {}

  handleOpenWriteComment = new BehaviorSubject<boolean>(false)
  handleOpenAnswers = new BehaviorSubject<boolean>(false)
  isSaving = new BehaviorSubject<boolean>(false)
  countAnswers = new BehaviorSubject<number>(0)
  answers = new BehaviorSubject<CommentModel[]>([])

  ngOnInit() {
    if (!this.isMenagaComponent && this.comment?.id) this.getCountAnswers()
  }

  addAnswer(answer: CommentModel) {
    this.isSaving.next(true);
    const rlyAnswer: CommentModel = {
      ...answer,
      articleId: this.comment.articleId,
      isNew: true,
      commentId: this.comment.id,
      isAnswer: true,
    };

    this.commentsService.addComment(rlyAnswer).subscribe({
      next: () => {
        this.isSaving.next(false);
        this.countAnswers.next(this.countAnswers.value + 1);
        this.answers.next([rlyAnswer, ...this.answers.value]);
      },
      error: () => {
        this.isSaving.next(false);
      }
    })
  }

  getAnswersToDisplay() {
    this.commentsService.getAnswers(this.comment.id).subscribe({
      next: docs => {
        let data: CommentModel[] = [];

        docs.forEach(doc => data.push(doc.data() as CommentModel));

        this.answers.next(data);
        this.handleOpenAnswers.next(true);
      },
    })
  }

  private getCountAnswers() {
    this.commentsService.getAnswers(this.comment.id).subscribe({
      next: docs => {
        this.countAnswers.next(docs.size);
      },
    })
  }
}
