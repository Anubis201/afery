import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';

type CommentMode = 'like' | 'dislike' | null;

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
  @Input() userName: string

  @Output() deleteComment = new EventEmitter<string>()

  constructor(
    private commentsService: CommentsService,
    private changeDetectorRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
  ) {}

  handleOpenWriteComment = new BehaviorSubject<boolean>(false)
  isSaving = new BehaviorSubject<boolean>(false)
  countAnswers = new BehaviorSubject<number>(0)
  answers = new BehaviorSubject<CommentModel[]>([])
  commentMode = new BehaviorSubject<CommentMode>(null)
  handleOpenAnswers = new BehaviorSubject<boolean>(false)

  ngOnInit() {
    console.log(this.comment)
    if (!this.isMenagaComponent && this.comment?.id) this.getCountAnswers();

    if (localStorage.getItem(this.comment.id) === 'like')
      this.commentMode.next('like');
    else if (localStorage.getItem(this.comment.id) === 'dislike')
      this.commentMode.next('dislike');
  }

  hideAnswers() {
    this.answers.next([]);
    this.handleOpenWriteComment.next(false);
    this.handleOpenAnswers.next(false);
  }

  addAnswer(answer: CommentModel) {
    this.isSaving.next(true);

    const rlyAnswer: CommentModel = {
      ...answer,
      articleId: this.comment.articleId,
      isNew: true,
      commentId: this.comment.id,
      isAnswer: true,
      name: this.userName,
      likes: 0,
      dislikes: 0,
    };

    this.commentsService.addComment(rlyAnswer).subscribe({
      next: doc => {
        this.answers.next([{ ...rlyAnswer, id: doc.id }, ...this.answers.value]);
        this.countAnswers.next(this.countAnswers.value + 1);
        this.isSaving.next(false);
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

        docs.forEach(doc => data.push({ ...doc.data() as CommentModel, date: (doc.data() as any).date.toDate(), id: doc.id }));

        this.answers.next(data);
        this.handleOpenAnswers.next(true);
      },
    })
  }

  handleLike() {
    this.comment.likes = this.comment.likes + 1;
    this.changeDetectorRef.detectChanges();
  }

  handleDislike() {
    this.comment.dislikes = this.comment.dislikes + 1;
    this.changeDetectorRef.detectChanges();
  }

  handleDeleteAnswer(id: string) {
    this.commentsService.deteleComment(id).subscribe({
      next: () => {
        this.answers.next(this.answers.value.filter(filterV => filterV.id !== id));
        this._snackBar.open('Odpowiedż została usunięta', 'close');
      },
      error: () => {
        this._snackBar.open('Błąd', 'close');
      }
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
