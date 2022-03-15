import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { increment } from 'firebase/firestore';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { showAnimation } from 'src/app/services/animations/others.animations';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';
import { RandomImageSrc } from 'src/app/services/global/support-functions/random-image';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  animations: [showAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input() isAdmin: boolean
  @Input() idUser: string
  @Input() avatarSrc: string
  @Input() isLogin: boolean
  @Input() userName: string
  @Input() isMenagaComponent: boolean = false

  @Output() deleteComment = new EventEmitter<string>()

  @Input() set comment(comment: CommentModel) {
    if (!comment) {
      return
    }

    this.commentData.next(comment);
    this.countAnswers.next(comment?.countAnswers);
  }

  handleOpenWriteComment = new BehaviorSubject<boolean>(false)
  isSaving = new BehaviorSubject<boolean>(false)
  countAnswers = new BehaviorSubject<number>(0)
  answers = new BehaviorSubject<CommentModel[]>([])
  handleOpenAnswers = new BehaviorSubject<boolean>(false)
  commentData = new BehaviorSubject<CommentModel>(null)
  isEditMode = new BehaviorSubject<boolean>(false)
  editTextControl = new FormControl(null, Validators.required)
  isChangingText = new BehaviorSubject<boolean>(false)

  readonly RandomImageSrc = RandomImageSrc()

  constructor(
    private commentsService: CommentsService,
    private _snackBar: MatSnackBar,
  ) {}

  get isYourComment() {
    return this.idUser === this.commentData.value.authorId && this.isLogin
  }

  handleChangeTextAnswer({ id, text }: { id: string, text: string }) {
    // TODO kiedys posprawdzac dzialanie edycji
    this.commentsService.updateComment(id, { text }).subscribe({
      next: () => {
        this.answers.next(this.answers.value.map(answer => {
          if (answer.id !== id) {
            return answer
          }

          return { ...answer, text }
        }))
      },
      error: () => {
        this._snackBar.open('Nie udało się usunąć komentarza', 'anuluj');
      }
    })
  }

  editText() {
    if (this.isEditMode.value) {
      this.isEditMode.next(false);
      return
    }

    this.editTextControl.patchValue(this.commentData.value.text);
    this.isEditMode.next(true);
  }

  changeText() {
    this.isChangingText.next(true);
    this.commentsService.updateComment(this.commentData.value.id, { text: this.editTextControl.value }).subscribe({
      next: () => {
        this.commentData.next({ ...this.commentData.value, text: this.editTextControl.value })
        this.isEditMode.next(false);
        this.isChangingText.next(false);
      },
      error: () => {
        this._snackBar.open('Nie udało się zmienić tekstu', 'anuluj');
        this.isChangingText.next(false);
      }
    })
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
      articleId: this.commentData.value.articleId,
      isNew: true,
      commentId: this.commentData.value.id,
      isAnswer: true,
      likes: 0,
      dislikes: 0,
      authorId: this.idUser,
    };

    this.commentsService.updateComment(this.commentData.value.id, { countAnswers: increment(1) as any }).pipe(
      switchMap(() => this.commentsService.addComment(rlyAnswer))
    ).subscribe({
      next: doc => {
        this.answers.next([{ ...rlyAnswer, id: doc.id, name: this.userName }, ...this.answers.value]);
        this.countAnswers.next(this.countAnswers.value + 1);
        this.isSaving.next(false);
      },
      error: () => {
        this.isSaving.next(false);
      }
    })
  }

  getAnswersToDisplay(openWrite = false) {
    if (openWrite) {
      this.handleOpenWriteComment.next(true);
    }

    this.commentsService.getAnswers(this.commentData.value.id).subscribe({
      next: docs => {
        let data: CommentModel[] = [];

        docs.forEach(doc => data.push({ ...doc.data() as CommentModel, date: (doc.data() as any).date.toDate(), id: doc.id }));

        this.answers.next(data);
        this.handleOpenAnswers.next(true);
      },
    })
  }

  handleLike(value: number) {
    this.commentData.next({ ...this.commentData.value, likes: this.commentData.value.likes + value });
    this.commentData.next({ ...this.commentData.value, likes: isNaN(this.commentData.value.likes) ? 1 : this.commentData.value.likes });
  }

  handleDislike(value: number) {
    this.commentData.next({ ...this.commentData.value, dislikes: this.commentData.value.dislikes + value });
    this.commentData.next({ ...this.commentData.value, dislikes:isNaN(this.commentData.value.dislikes) ? 1 : this.commentData.value.dislikes });
  }

  handleDeleteAnswer(id: string) {
    this.commentsService.updateComment(this.commentData.value.id, { countAnswers: increment(-1) as any }).pipe(
      switchMap(() => this.commentsService.deteleComment(id))
    ).subscribe({
      next: () => {
        this.answers.next(this.answers.value.filter(filterV => filterV.id !== id));
        this.countAnswers.next(this.countAnswers.value - 1);
        this.isSaving.next(false);
      },
      error: () => {
        this._snackBar.open('Nie udało się usunąć komentarza', 'anuluj');
      }
    })
  }
}
