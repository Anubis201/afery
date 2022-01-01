import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllArticlesComponent } from './all-articles.component';
import { AllArticlesRoutingModule } from './all-articles-routing.module';
import { ArticleComponent } from '../shared/article/article.component';
import { PartiesComponent } from './parties/parties.component';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MillionsPipe } from 'src/app/services/pipes/milions/millions.pipe';



@NgModule({
  declarations: [
    AllArticlesComponent,
    ArticleComponent,
    PartiesComponent,
    MillionsPipe,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    AllArticlesRoutingModule,
    MatTooltipModule,
    MatIconModule,
  ],
})
export class AllArticlesModule { }
