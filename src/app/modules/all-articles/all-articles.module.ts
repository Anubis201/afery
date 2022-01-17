import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllArticlesComponent } from './all-articles.component';
import { AllArticlesRoutingModule } from './all-articles-routing.module';
import { ArticleComponent } from '../shared/article/article.component';
import { SectionComponent } from './section/section.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    AllArticlesComponent,
    ArticleComponent,
    SectionComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    AllArticlesRoutingModule,
    SharedModule,
    MatProgressSpinnerModule,
  ],
})
export class AllArticlesModule { }
