import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AllArticlesComponent } from './all-articles.component';
import { AllArticlesRoutingModule } from './all-articles-routing.module';
import { SectionComponent } from './section/section.component';
import { SharedModule } from '../shared/shared.module';
import { TopArticlesComponent } from './top-articles/top-articles.component';
import { PollBarComponent } from './poll-bar/poll-bar.component';



@NgModule({
  declarations: [
    AllArticlesComponent,
    SectionComponent,
    TopArticlesComponent,
    PollBarComponent,
  ],
  providers: [DatePipe],
  imports: [
    CommonModule,
    AllArticlesRoutingModule,
    SharedModule,
  ],
})
export class AllArticlesModule { }
