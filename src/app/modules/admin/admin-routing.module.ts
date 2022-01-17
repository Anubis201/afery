import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CheckAuthGuard } from 'src/app/services/guards/auth/check-auth.guard'
import { AdminComponent } from './admin.component'
import { AuthComponent } from './auth/auth.component'
import { ManageCommentsComponent } from './manage-comments/manage-comments.component'
import { CreateComponent } from './create/create.component'

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
        path: 'auth',
        component: AuthComponent,
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
