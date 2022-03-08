import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckAuthGuard } from 'src/app/services/guards/auth/check-auth.guard';
import { AccountComponent } from './account.component';
import { NavigationComponent } from './navigation-item/navigation.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    // canActivate: [CheckAuthGuard],
    children: [
      {
        path: 'wybierz',
        component: NavigationComponent,
      },
      {
        path: 'ustawienia',
        component: SettingsComponent,
      },
      {
        path: '**',
        redirectTo: 'wybierz',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
