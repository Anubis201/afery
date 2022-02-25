import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';
import { UserService } from 'src/app/services/global/user/user.service';
import { WorkingCommentsService } from 'src/app/services/global/working-comments/working-comments.service';

interface DialogDataModel {
  article: ArticleModel
  link: string
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
  actionMode = new BehaviorSubject<'like' | 'dislike' | null>(null)
  isLoading = new BehaviorSubject<boolean>(false)

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataModel,
    private commentsService: CommentsService,
    private userService: UserService,
    private workingCommentsService: WorkingCommentsService,
  ) { }

  get isAdmin() {
    return this.userService.isAdmin
  }

  get userName() {
    return this.userService.userName
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

    this.workingCommentsService.extendedAddComment(rlyComment).subscribe({
      next: doc => {
        this.comments.next([{ ...rlyComment, id: doc.id, name: this.userName.value }, ...this.comments.value]);
        this.isSavingComment.next(false);
      },
      error: () => {
        this.isSavingComment.next(false);
      }
    })
  }

  getComments() {
    this.isLoading.next(true);
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
      },
      complete: () => this.isLoading.next(false)
    })
  }

  deleteComment(id: string) {
    this.commentsService.deteleComment(id).subscribe({
      next: () => {
        this.comments.next(this.comments.value.filter(filterV => filterV.id !== id));
      },
    })
  }
}
