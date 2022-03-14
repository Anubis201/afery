import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminComponent } from './admin.component'
import { ManageCommentsComponent } from './manage-comments/manage-comments.component'
import { CreateComponent } from './create/create.component'
import { AddPollsComponent } from './add-polls/add-polls.component'
import { AdminAuthGuard } from 'src/app/services/guards/admin-auth/admin-auth.guard'

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    children: [
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'comments',
        component: ManageCommentsComponent,
      },
      {
        path: 'polls',
        component: AddPollsComponent,
      },
      {
        path: '**',
        redirectTo: 'create',
        pathMatch: 'full',
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
