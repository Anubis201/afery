import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { CommentModel } from 'src/app/models/articles/comment.model';

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
export class ShortArticleComponent {
  comments = new BehaviorSubject<CommentModel[]>([])
  isSavingComment = new BehaviorSubject<boolean>(false)
  actionMode = new BehaviorSubject<'like' | 'dislike' | null>(null)
  isLoading = new BehaviorSubject<boolean>(false)

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataModel,
  ) { }
}
