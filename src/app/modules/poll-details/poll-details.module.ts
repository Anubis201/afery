import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollDetailsComponent } from './poll-details.component';
import { PollDetailsRoutingModule } from './poll-details-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    PollDetailsComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    PollDetailsRoutingModule,
    SharedModule,
  ]
})
export class PollDetailsModule { }
