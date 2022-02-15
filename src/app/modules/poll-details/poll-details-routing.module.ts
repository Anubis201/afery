import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PollDetailsComponent } from './poll-details.component'

const routes: Routes = [
  {
    path: ':id/:title',
    component: PollDetailsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollDetailsRoutingModule { }
