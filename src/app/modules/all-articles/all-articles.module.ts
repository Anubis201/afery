import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllArticlesComponent } from './all-articles.component';
import { AllArticlesRoutingModule } from './all-articles-routing.module';
import { ArticleComponent } from '../shared/article/article.component';



@NgModule({
  declarations: [
    AllArticlesComponent,
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    AllArticlesRoutingModule,
  ]
})
export class AllArticlesModule { }
