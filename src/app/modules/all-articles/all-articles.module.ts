import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllArticlesComponent } from './all-articles.component';
import { AllArticlesRoutingModule } from './all-articles-routing.module';
import { SectionComponent } from './section/section.component';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TopArticleComponent } from './top-article/top-article.component';



@NgModule({
  declarations: [
    AllArticlesComponent,
    SectionComponent,
    TopArticleComponent,
  ],
  imports: [
    CommonModule,
    AllArticlesRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
  ],
})
export class AllArticlesModule { }
