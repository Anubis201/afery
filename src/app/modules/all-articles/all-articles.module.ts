import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllArticlesComponent } from './all-articles.component';
import { AllArticlesRoutingModule } from './all-articles-routing.module';
import { SectionComponent } from './section/section.component';
import { SharedModule } from '../shared/shared.module';
import { TopArticlesComponent } from './top-articles/top-articles.component';
import { ImportantArticleComponent } from './important-article/important-article.component';



@NgModule({
  declarations: [
    AllArticlesComponent,
    SectionComponent,
    TopArticlesComponent,
    ImportantArticleComponent,
  ],
  imports: [
    CommonModule,
    AllArticlesRoutingModule,
    SharedModule,
  ],
})
export class AllArticlesModule { }
