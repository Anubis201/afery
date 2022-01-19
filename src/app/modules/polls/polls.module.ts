import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollsComponent } from './polls.component';
import { SharedModule } from '../shared/shared.module';
import { PollsRoutingModule } from './article-page-routing.module';



@NgModule({
  declarations: [
    PollsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PollsRoutingModule
  ]
})
export class PollsModule { }
