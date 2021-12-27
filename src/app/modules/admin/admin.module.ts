import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthComponent } from './auth/auth.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MatListModule } from '@angular/material/list';
import { CreateComponent } from './create/create.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AdminComponent,
    AuthComponent,
    MenuListComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    AdminRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatListModule,
  ]
})
export class AdminModule { }
