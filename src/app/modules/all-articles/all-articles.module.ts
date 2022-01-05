import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllArticlesComponent } from './all-articles.component';
import { AllArticlesRoutingModule } from './all-articles-routing.module';
import { ArticleComponent } from '../shared/article/article.component';
import { SectionComponent } from './section/section.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';



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
    MatTooltipModule,
    SharedModule,
    MatIconModule,
  ],
})
export class AllArticlesModule { }
