import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthComponent } from './auth/auth.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MatListModule } from '@angular/material/list';
import { CreateComponent } from './create/create.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';
import { SharedModule } from '../shared/shared.module';
import { MatBadgeModule } from '@angular/material/badge';



@NgModule({
  declarations: [
    AdminComponent,
    AuthComponent,
    MenuListComponent,
    CreateComponent,
    ManageCommentsComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    AdminRoutingModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatListModule,
    EditorModule,
    SharedModule,
    MatBadgeModule,
  ]
})
export class AdminModule { }
