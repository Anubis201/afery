import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input() comment: CommentModel
  @Input() isAdmin: boolean

  @Output() deleteComment = new EventEmitter<string>()

  constructor(private commentsService: CommentsService) {}

  handleOpenWriteComment = new BehaviorSubject<boolean>(false)
  isSaving = new BehaviorSubject<boolean>(false)

  addAnswer(answer: CommentModel) {
    this.isSaving.next(true);
    const rlyAnswer: CommentModel = { ...answer, articleId: this.comment.articleId, isNew: true, commentid: this.comment.id };

    this.commentsService.addComment(rlyAnswer).subscribe({
      next: () => {
        this.isSaving.next(false);
      },
      error: () => {
        this.isSaving.next(false);
      }
    })
  }
}
