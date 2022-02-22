import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlePageComponent } from './article-page.component';
import { ArticlePageRoutingModule } from './article-page-routing.module';
import { CommentsComponent } from './comments/comments.component';
import { SharedModule } from '../shared/shared.module';
import { ReadingProgressBarComponent } from './reading-progress-bar/reading-progress-bar.component';
import { PcArticleComponent } from './pc-article/pc-article.component';
import { MobileArticleComponent } from './mobile-article/mobile-article.component';



@NgModule({
  declarations: [
    ArticlePageComponent,
    CommentsComponent,
    ReadingProgressBarComponent,
    PcArticleComponent,
    MobileArticleComponent,
  ],
  imports: [
    CommonModule,
    ArticlePageRoutingModule,
    SharedModule,
  ]
})
export class ArticlePageModule { }
