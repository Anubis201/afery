import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MillionsPipe } from 'src/app/services/pipes/milions/millions.pipe';
import { TimeToReadPipe } from 'src/app/services/pipes/time-to-read/time-to-read.pipe';
import { SafeHtmlPipe } from 'src/app/services/pipes/safe-html/safe-html.pipe';
import { CommentComponent } from './comment/comment.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

const declarations = [
  MillionsPipe,
  TimeToReadPipe,
  SafeHtmlPipe,

  CommentComponent,
]

const imports = [
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
]

@NgModule({
  declarations: [
    ...declarations
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
