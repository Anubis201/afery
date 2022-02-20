import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PollDetailsComponent } from './poll-details.component';
import { PollDetailsRoutingModule } from './poll-details-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { MainPollPartyComponent } from './main-poll-party/main-poll-party.component';
import { MatTableModule } from '@angular/material/table';
import { TablePollComponent } from './table-poll/table-poll.component';
import { MandatesComponent } from './mandates/mandates.component';
import { MainPollPresidentsComponent } from './main-poll-presidents/main-poll-presidents.component';



@NgModule({
  declarations: [
    PollDetailsComponent,
    HeaderComponent,
    MainPollPartyComponent,
    TablePollComponent,
    MandatesComponent,
    MainPollPresidentsComponent,
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    PollDetailsRoutingModule,
    SharedModule,
    MatTableModule,
  ]
})
export class PollDetailsModule { }
