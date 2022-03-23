import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagViewComponent } from './tag-view.component';

const routes: Routes = [
  {
    path: ':tagName',
    component: TagViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagViewRoutingModule { }
