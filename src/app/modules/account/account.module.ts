import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { SharedModule } from '../shared/shared.module';
import { NavigationComponent } from './navigation-item/navigation.component';
import { SettingsComponent } from './settings/settings.component';
import { DeleteAccountComponent } from './settings/delete-account/delete-account.component';


@NgModule({
  declarations: [
    AccountComponent,
    NavigationComponent,
    SettingsComponent,
    DeleteAccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule
  ]
})
export class AccountModule { }
