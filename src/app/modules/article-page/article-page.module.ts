import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlePageComponent } from './article-page.component';
import { ArticlePageRoutingModule } from './article-page-routing.module';
import { CommentsComponent } from './comments/comments.component';
import { SharedModule } from '../shared/shared.module';
import { ReadingProgressBarComponent } from './reading-progress-bar/reading-progress-bar.component';
import { PcArticleComponent } from './pc-article/pc-article.component';
import { MobileArticleComponent } from './mobile-article/mobile-article.component';
import { MobileHeaderComponent } from './mobile-article/mobile-header/mobile-header.component';
import { MobileMainComponent } from './mobile-article/mobile-main/mobile-main.component';
import { PcMainComponent } from './pc-article/pc-main/pc-main.component';
import { PcHeaderComponent } from './pc-article/pc-header/pc-header.component';
import { PcShortArticleComponent } from './pc-article/pc-short-article/pc-short-article.component';
import { MobileShortArticleComponent } from './mobile-article/mobile-short-article/mobile-short-article.component';



@NgModule({
  declarations: [
    ArticlePageComponent,
    CommentsComponent,
    ReadingProgressBarComponent,
    PcArticleComponent,
    MobileArticleComponent,
    MobileHeaderComponent,
    MobileMainComponent,
    PcMainComponent,
    PcHeaderComponent,
    PcShortArticleComponent,
    MobileShortArticleComponent,
  ],
  imports: [
    CommonModule,
    ArticlePageRoutingModule,
    SharedModule,
  ]
})
export class ArticlePageModule { }
