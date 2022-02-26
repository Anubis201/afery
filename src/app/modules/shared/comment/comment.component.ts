import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';
import { WorkingCommentsService } from 'src/app/services/global/working-comments/working-comments.service';

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
  @Output() deleteAnswer = new EventEmitter<string>()

  constructor(
    private commentsService: CommentsService,
    private changeDetectorRef: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private workingCommentsService: WorkingCommentsService,
  ) {}

  handleOpenWriteComment = new BehaviorSubject<boolean>(false)
  handleOpenAnswers = new BehaviorSubject<boolean>(false)
  isSaving = new BehaviorSubject<boolean>(false)
  countAnswers = new BehaviorSubject<number>(0)
  answers = new BehaviorSubject<CommentModel[]>([])
  commentMode = new BehaviorSubject<CommentMode>(null)

  ngOnInit() {
    if (!this.isMenagaComponent && this.comment?.id) this.getCountAnswers();

    if (localStorage.getItem(this.comment.id) === 'like')
      this.commentMode.next('like');
    else if (localStorage.getItem(this.comment.id) === 'dislike')
      this.commentMode.next('dislike');
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

    this.workingCommentsService.extendedAddComment(rlyAnswer).subscribe({
      next: () => {
        this.answers.next([{ ...rlyAnswer, name: this.userName }, ...this.answers.value]);
        console.log(this.answers.value)
        this.countAnswers.next(this.countAnswers.value + 1);
        this.isSaving.next(false);
        this.handleOpenAnswers.next(true);
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

  approve(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.commentMode.value === 'like' || forceMinus) {
      if (this.commentMode.value === 'like') localStorage.removeItem(this.comment.id);
      value = -1;
      this.commentMode.next(null);
    } else {
      if (this.commentMode.value === 'dislike') this.dislike(true);
      this.commentMode.next('like');
      localStorage.setItem(this.comment.id, 'like');
      value = 1;
    }

    this.commentsService.updateLikes(this.comment.id, value).subscribe({
      next: () => {
        this.comment.likes = this.comment?.likes + value;
        this.comment.likes = isNaN(this.comment.likes) ? 1 : this.comment.likes;
        this.changeDetectorRef.detectChanges();
      },
    })
  }

  dislike(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.commentMode.value === 'dislike' || forceMinus) {
      if (this.commentMode.value === 'dislike') localStorage.removeItem(this.comment.id);
      value = -1;
      this.commentMode.next(null);
    } else {
      if (this.commentMode.value === 'like') this.approve(true);
      this.commentMode.next('dislike');
      localStorage.setItem(this.comment.id, 'dislike');
      value = 1;
    }

    this.commentsService.updateDislikes(this.comment.id, value).subscribe({
      next: () => {
        this.comment.dislikes = this.comment?.dislikes + value;
        this.comment.dislikes = isNaN(this.comment.dislikes) ? 1 : this.comment.dislikes;
        this.changeDetectorRef.detectChanges();
      },
    })
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
