import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthComponent } from './auth/auth.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuListComponent } from './dashboard/menu-list/menu-list.component';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    AdminComponent,
    AuthComponent,
    DashboardComponent,
    MenuListComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    AdminRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatListModule,
  ]
})
export class AdminModule { }
