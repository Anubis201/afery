import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { CommentsType } from 'src/app/models/others/comments.type';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-global-comments',
  templateUrl: './global-comments.component.html',
  styleUrls: ['./global-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalCommentsComponent {
  @Input() parentId: string // polls id or article id
  @Input() commentType: CommentsType

  isSavingComment = new BehaviorSubject<boolean>(false)
  comments = new BehaviorSubject<CommentModel[]>([])
  isLoading = new BehaviorSubject<boolean>(false)

  constructor(
    private userService: UserService,
    private commentsService: CommentsService,
    private _snackBar: MatSnackBar,
  ) { }

  get isAdmin() {
    return this.userService.isAdmin
  }

  get userName() {
    return this.userService.userName
  }

  ngOnInit() {
    this.getComments(this.parentId);
  }

  getComments(parentId: string) {
    this.isLoading.next(true);
    this.commentsService.getComments(parentId, this.commentType).subscribe({
      next: commentsDocs => {
        const allComments: CommentModel[] = [];

        commentsDocs.forEach(comment => {
          allComments.push({
            ...comment.data() as CommentModel,
            date: (comment.data() as any).date.toDate(),
            id: comment.id
          });
        });

        this.comments.next(allComments);
      },
      complete: () => this.isLoading.next(false)
    })
  }

  addComment(comment: CommentModel) {
    this.isSavingComment.next(true);

    const rlyComment: CommentModel = {
      ...comment,
      articleId: this.commentType === 'articles' ? this.parentId : null,
      pollId: this.commentType === 'polls' ? this.parentId : null,
      isNew: true,
      isAnswer: false,
      name: this.userService.userName.value,
    };

    this.commentsService.addComment(rlyComment).subscribe({
      next: doc => {
        this.comments.next([{ ...rlyComment, id: doc.id }, ...this.comments.value]);
        this.isSavingComment.next(false);
      },
      error: () => {
        this.isSavingComment.next(false);
      }
    });
  }

  deleteComment(id: string) {
    this.commentsService.deteleComment(id).subscribe({
      next: () => {
        this.comments.next(this.comments.value.filter(filterV => filterV.id !== id));
        this._snackBar.open('Komentarz został usunięty', 'close');
      },
      error: () => {
        this._snackBar.open('Błąd', 'close');
      }
    })
  }
}
