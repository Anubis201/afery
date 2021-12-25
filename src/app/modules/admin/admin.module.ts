import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthComponent } from './auth/auth.component';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    AdminComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
