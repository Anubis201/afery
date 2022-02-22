import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PollsComponent } from './polls.component';
import { SharedModule } from '../shared/shared.module';
import { PollsRoutingModule } from './article-page-routing.module';
import { PollPartyComponent } from './poll-party/poll-party.component';
import { SectionComponent } from './section/section.component';
import { PollPresidentComponent } from './poll-president/poll-president.component';
import { PollCarouselComponent } from './poll-carousel/poll-carousel.component';
import { MatCarouselModule } from '@ngbmodule/material-carousel';



@NgModule({
  declarations: [
    PollsComponent,
    PollPartyComponent,
    SectionComponent,
    PollPresidentComponent,
    PollCarouselComponent,
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    SharedModule,
    PollsRoutingModule,
    MatCarouselModule,
  ]
})
export class PollsModule { }
