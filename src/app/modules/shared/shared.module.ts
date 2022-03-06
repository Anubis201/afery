import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MillionsPipe } from 'src/app/services/pipes/milions/millions.pipe';
import { TimeToReadPipe } from 'src/app/services/pipes/time-to-read/time-to-read.pipe';
import { SafeHtmlPipe } from 'src/app/services/pipes/safe-html/safe-html.pipe';
import { CommentComponent } from './comment/comment.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WriteCommentComponent } from './write-comment/write-comment.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnswerComponent } from './answer/answer.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ArticleComponent } from './article/article.component';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ShortArticleComponent } from './short-article/short-article.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component';
import { SaveButtonComponent } from './save-button/save-button.component';
import { IsLoadingComponent } from './is-loading/is-loading.component';
import { GlobalCommentsComponent } from './global-comments/global-comments.component';
import { TopDiscussionComponent } from './top-discussion/top-discussion.component';
import { TimePipe } from 'src/app/services/pipes/time/time.pipe';
import { MatSelectModule } from '@angular/material/select';
import { PlusMinusComponent } from './plus-minus/plus-minus.component';

const declarations = [
  MillionsPipe,
  TimeToReadPipe,
  SafeHtmlPipe,
  TimePipe,

  CommentComponent,
  WriteCommentComponent,
  AnswerComponent,
  ArticleComponent,
  ShortArticleComponent,
  LoginComponent,
  GlobalCommentsComponent,
  SaveButtonComponent,
  IsLoadingComponent,
  TopDiscussionComponent,
  PlusMinusComponent,
]

const imports = [
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatInputModule,
  ReactiveFormsModule,
  FormsModule,
  MatBadgeModule,
  MatCardModule,
  RouterModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSelectModule,
]

@NgModule({
  declarations: [
    ...declarations,
  ],
  imports: [
    CommonModule,
    ...imports
  ],
  exports: [
    ...declarations,
    ...imports,
  ]
})
export class SharedModule { }
