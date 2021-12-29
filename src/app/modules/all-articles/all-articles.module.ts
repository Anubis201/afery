import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllArticlesComponent } from './all-articles.component';
import { AllArticlesRoutingModule } from './all-articles-routing.module';
import { ArticleComponent } from '../shared/article/article.component';
import { PartiesComponent } from './parties/parties.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    AllArticlesComponent,
    ArticleComponent,
    PartiesComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    AllArticlesRoutingModule,
  ]
})
export class AllArticlesModule { }
