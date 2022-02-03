import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';
import { UserService } from 'src/app/services/global/user/user.service';

interface DialogDataModel {
  article: ArticleModel
}

@Component({
  selector: 'app-short-article',
  templateUrl: './short-article.component.html',
  styleUrls: ['./short-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ShortArticleComponent implements OnInit {
  comments = new BehaviorSubject<CommentModel[]>([])
  isSavingComment = new BehaviorSubject<boolean>(false)

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataModel,
    private commentsService: CommentsService,
    private userService: UserService,
  ) { }

  get isAdmin() {
    return this.userService.isAdmin
  }

  ngOnInit() {
    this.getComments();
  }

  handleAddComment(comment: CommentModel) {
    this.isSavingComment.next(true);
    const rlyComment: CommentModel = {
      ...comment,
      articleId: this.dialogData.article?.id,
      isNew: true,
      isAnswer: false,
    };

    this.commentsService.addComment(rlyComment).subscribe({
      next: doc => {
        this.comments.next([{ ...rlyComment, id: doc.id }, ...this.comments.value]);
        this.isSavingComment.next(false);
      },
      error: () => {
        this.isSavingComment.next(false);
      }
    })
  }

  getComments() {
    this.commentsService.getComments(this.dialogData.article.id).subscribe({
      next: commentsDocs => {
        let allComments: CommentModel[] = [];

        commentsDocs.forEach(comment => {
          allComments.push({
            ...comment.data() as CommentModel,
            date: (comment.data() as any).date.toDate(),
            id: comment.id
          });
        });

        this.comments.next(allComments);
      }
    })
  }
}
