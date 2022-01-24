import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlePageComponent } from './article-page.component';
import { ArticlePageRoutingModule } from './article-page-routing.module';
import { CommentsComponent } from './comments/comments.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';
import { ReadingProgressBarComponent } from './reading-progress-bar/reading-progress-bar.component';



@NgModule({
  declarations: [
    ArticlePageComponent,
    CommentsComponent,
    ReadingProgressBarComponent,
  ],
  imports: [
    CommonModule,
    ArticlePageRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
  ]
})
export class ArticlePageModule { }
