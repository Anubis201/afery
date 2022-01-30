import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllArticlesComponent } from './all-articles.component';
import { AllArticlesRoutingModule } from './all-articles-routing.module';
import { SectionComponent } from './section/section.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AllArticlesComponent,
    SectionComponent,
  ],
  imports: [
    CommonModule,
    AllArticlesRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
  ],
})
export class AllArticlesModule { }
