import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';
import { UserService } from 'src/app/services/global/user/user.service';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataModel,
    private commentsService: CommentsService,
    private userService: UserService,
    private articlesService: ArticlesService,
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

  approve(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.actionMode.value === 'like' || forceMinus) {
      if (this.actionMode.value === 'like') localStorage.removeItem(this.dialogData.article.id);
      value = -1;
      this.actionMode.next(null);
    } else {
      if (this.actionMode.value === 'dislike') this.dislike(true);
      this.actionMode.next('like');
      localStorage.setItem(this.dialogData.article.id, 'like');
      value = 1;
    }

    this.articlesService.updateLikes(this.dialogData.article.id, value).subscribe({
      next: () => {
        this.dialogData.article = {
          ...this.dialogData.article,
         likes: this.dialogData?.article.likes + value,
        };

        this.dialogData.article = {
          ...this.dialogData.article,
          likes: isNaN(this.dialogData.article.likes) ? 1 : this.dialogData.article.likes
        }
      },
    })
  }

  dislike(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.actionMode.value === 'dislike' || forceMinus) {
      if (this.actionMode.value === 'dislike') localStorage.removeItem(this.dialogData.article.id);
      value = -1;
      this.actionMode.next(null);
    } else {
      if (this.actionMode.value === 'like') this.approve(true);
      this.actionMode.next('dislike');
      localStorage.setItem(this.dialogData.article.id, 'dislike');
      value = 1;
    }

    this.articlesService.updateDislikes(this.dialogData.article.id, value).subscribe({
      next: () => {
        this.dialogData.article = {
          ...this.dialogData.article,
          dislikes: this.dialogData.article?.dislikes + value
        };

        this.dialogData.article = {
          ...this.dialogData.article,
          dislikes: this.dialogData.article.dislikes = isNaN(this.dialogData.article.dislikes) ? 1 : this.dialogData.article.dislikes,
        };
      },
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
