import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticleModel } from 'src/app/models/articles/article.model';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogDataModel,
  ) { }

  ngOnInit() {
  }
}
