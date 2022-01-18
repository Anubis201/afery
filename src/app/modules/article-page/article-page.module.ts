import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlePageComponent } from './article-page.component';
import { ArticlePageRoutingModule } from './article-page-routing.module';
import { CommentsComponent } from './comments/comments.component';
import { WriteCommentComponent } from './write-comment/write-comment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReadingProgressBarComponent } from './reading-progress-bar/reading-progress-bar.component';



@NgModule({
  declarations: [
    ArticlePageComponent,
    CommentsComponent,
    WriteCommentComponent,
    ReadingProgressBarComponent,
  ],
  imports: [
    CommonModule,
    ArticlePageRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
    MatProgressSpinnerModule,
  ]
})
export class ArticlePageModule { }
