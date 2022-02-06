import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlePageComponent } from './article-page.component';
import { ArticlePageRoutingModule } from './article-page-routing.module';
import { CommentsComponent } from './comments/comments.component';
import { SharedModule } from '../shared/shared.module';
import { ReadingProgressBarComponent } from './reading-progress-bar/reading-progress-bar.component';
import { PollComponent } from './poll/poll.component';



@NgModule({
  declarations: [
    ArticlePageComponent,
    CommentsComponent,
    ReadingProgressBarComponent,
    PollComponent,
  ],
  imports: [
    CommonModule,
    ArticlePageRoutingModule,
    SharedModule,
  ]
})
export class ArticlePageModule { }
