import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { showAnimation } from 'src/app/services/animations/others.animations';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [showAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentModel
  @Input() isAdmin: boolean
  @Input() isMenagaComponent: boolean = false
  @Input() userName: string
  @Input() idUser: string

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
  handleOpenAnswers = new BehaviorSubject<boolean>(false)

  ngOnInit() {
    if (!this.isMenagaComponent && this.comment?.id) this.getCountAnswers();
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
      authorId: this.idUser,
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

  handleLike(value: number) {
    this.comment.likes = this.comment.likes + value;
    this.comment.likes = isNaN(this.comment.likes) ? 1 : this.comment.likes;
    this.changeDetectorRef.detectChanges();
  }

  handleDislike(value: number) {
    this.comment.dislikes = this.comment.dislikes + value;
    this.comment.dislikes = isNaN(this.comment.dislikes) ? 1 : this.comment.dislikes;
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
