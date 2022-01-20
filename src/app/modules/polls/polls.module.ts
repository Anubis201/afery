import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollsComponent } from './polls.component';
import { SharedModule } from '../shared/shared.module';
import { PollsRoutingModule } from './article-page-routing.module';
import { NewestsComponent } from './newests/newests.component';
import { AvarageComponent } from './avarage/avarage.component';



@NgModule({
  declarations: [
    PollsComponent,
    NewestsComponent,
    AvarageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PollsRoutingModule
  ]
})
export class PollsModule { }
