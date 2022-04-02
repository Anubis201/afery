import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PollsComponent } from './polls.component';
import { SharedModule } from '../shared/shared.module';
import { PollsRoutingModule } from './article-page-routing.module';
import { PollPartyComponent } from './poll-party/poll-party.component';
import { SectionComponent } from './section/section.component';
import { PollPresidentComponent } from './poll-president/poll-president.component';
import { OtherComponent } from './other/other.component';



@NgModule({
  declarations: [
    PollsComponent,
    PollPartyComponent,
    SectionComponent,
    PollPresidentComponent,
    OtherComponent,
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    SharedModule,
    PollsRoutingModule,
  ]
})
export class PollsModule { }
