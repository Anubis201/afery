import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectionTestComponent } from './election-test.component';

const routes: Routes = [
  {
    path: '',
    component: ElectionTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectionTestRoutingModule { }
