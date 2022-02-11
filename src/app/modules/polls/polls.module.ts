import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PollsComponent } from './polls.component';
import { SharedModule } from '../shared/shared.module';
import { PollsRoutingModule } from './article-page-routing.module';
import { PollPcComponent } from './poll-pc/poll-pc.component';
import { PollMobileComponent } from './poll-mobile/poll-mobile.component';



@NgModule({
  declarations: [
    PollsComponent,
    PollPcComponent,
    PollMobileComponent
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    SharedModule,
    PollsRoutingModule
  ]
})
export class PollsModule { }
