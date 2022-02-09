import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AllArticlesComponent } from './all-articles.component'

const routes: Routes = [
  {
    path: '',
    component: AllArticlesComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllArticlesRoutingModule { }
