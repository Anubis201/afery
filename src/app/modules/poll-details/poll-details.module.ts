import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PollDetailsComponent } from './poll-details.component';
import { PollDetailsRoutingModule } from './poll-details-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { MainPollComponent } from './main-poll/main-poll.component';
import { MatTableModule } from '@angular/material/table';
import { TablePollComponent } from './table-poll/table-poll.component';
import { MandatesComponent } from './mandates/mandates.component';



@NgModule({
  declarations: [
    PollDetailsComponent,
    HeaderComponent,
    MainPollComponent,
    TablePollComponent,
    MandatesComponent
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
