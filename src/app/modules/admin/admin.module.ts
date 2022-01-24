import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthComponent } from './auth/auth.component';
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
import { AddPollsComponent } from './add-polls/add-polls.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PartiesComponent } from './add-polls/parties/parties.component';
import { DetailsComponent } from './add-polls/details/details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



@NgModule({
  declarations: [
    AdminComponent,
    AuthComponent,
    MenuListComponent,
    CreateComponent,
    ManageCommentsComponent,
    AddPollsComponent,
    PartiesComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatExpansionModule,
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
