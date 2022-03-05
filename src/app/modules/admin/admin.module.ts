import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MatListModule } from '@angular/material/list';
import { CreateComponent } from './create/create.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ManageCommentsComponent } from './manage-comments/manage-comments.component';
import { SharedModule } from '../shared/shared.module';
import { AddPollsComponent } from './add-polls/add-polls.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PollItemsComponent } from './add-polls/poll-item/poll-items.component';
import { DetailsComponent } from './add-polls/details/details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChooseTypeComponent } from './add-polls/choose-type/choose-type.component';



@NgModule({
  declarations: [
    AdminComponent,
    MenuListComponent,
    CreateComponent,
    ManageCommentsComponent,
    AddPollsComponent,
    PollItemsComponent,
    DetailsComponent,
    ChooseTypeComponent,
  ],
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatExpansionModule,
    MatCheckboxModule,
    AdminRoutingModule,
    MatListModule,
    EditorModule,
    SharedModule,
  ]
})
export class AdminModule { }
