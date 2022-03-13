import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';
import { CommentsType } from 'src/app/models/others/comments.type';
import { showAnimation } from 'src/app/services/animations/others.animations';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-global-comments',
  templateUrl: './global-comments.component.html',
  styleUrls: ['./global-comments.component.scss'],
  animations: [showAnimation],
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

  get idUser() {
    return this.userService.idUser
  }

  get isAdmin() {
    return this.userService.isAdmin
  }

  get userName() {
    return this.userService.userName
  }

  ngOnInit() {
    this.getComments();
  }

  getComments(order: OrderEnum = OrderEnum.Latest) {
    this.isLoading.next(true);
    this.commentsService.getComments(this.parentId, this.commentType, order).subscribe({
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
        this.isLoading.next(false);
      },
      error: () => {
        this.isLoading.next(false)
      }
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
      likes: 0,
      dislikes: 0,
      authorId: this.idUser.value,
      countAnswers: 0,
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
    // TODO Dodać usuwanie odpowiedzi
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
