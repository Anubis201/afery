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



@NgModule({
  declarations: [
    ArticlePageComponent,
    CommentsComponent,
    WriteCommentComponent,
  ],
  imports: [
    CommonModule,
    ArticlePageRoutingModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    SharedModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ]
})
export class ArticlePageModule { }
