import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor(
    private commentsService: CommentsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  handleOpenWriteComment = new BehaviorSubject<boolean>(false)
  handleOpenAnswers = new BehaviorSubject<boolean>(false)
  isSaving = new BehaviorSubject<boolean>(false)
  countAnswers = new BehaviorSubject<number>(0)
  answers = new BehaviorSubject<CommentModel[]>([])
  usedLike = new BehaviorSubject<boolean>(false)
  usedDislike = new BehaviorSubject<boolean>(false)

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

        docs.forEach(doc => data.push({ ...doc.data() as CommentModel, date: (doc.data() as any).date.toDate() }));

        this.answers.next(data);
        this.handleOpenAnswers.next(true);
      },
    })
  }

  approve(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.usedLike.value || forceMinus) {
      value = -1;
      this.usedLike.next(false);
    } else {
      if (this.usedDislike.value) this.dislike(true);
      this.usedLike.next(true);
      this.usedDislike.next(false);
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

    if (this.usedDislike.value || forceMinus) {
      value = -1;
      this.usedDislike.next(false);
    } else {
      if (this.usedLike.value) this.approve(true);
      this.usedDislike.next(true);
      this.usedLike.next(false);
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

  private getCountAnswers() {
    this.commentsService.getAnswers(this.comment.id).subscribe({
      next: docs => {
        this.countAnswers.next(docs.size);
      },
    })
  }
}
