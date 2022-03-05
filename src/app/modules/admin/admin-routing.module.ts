import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CheckAuthGuard } from 'src/app/services/guards/auth/check-auth.guard'
import { AdminComponent } from './admin.component'
import { ManageCommentsComponent } from './manage-comments/manage-comments.component'
import { CreateComponent } from './create/create.component'
import { AddPollsComponent } from './add-polls/add-polls.component'

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'create',
        component: CreateComponent,
        canActivate: [CheckAuthGuard],
      },
      {
        path: 'comments',
        component: ManageCommentsComponent,
        canActivate: [CheckAuthGuard],
      },
      {
        path: 'polls',
        component: AddPollsComponent,
        canActivate: [CheckAuthGuard],
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
