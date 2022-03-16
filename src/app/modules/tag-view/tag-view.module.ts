import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagViewRoutingModule } from './tag-view-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TagViewComponent } from './tag-view.component';


@NgModule({
  declarations: [
    TagViewComponent
  ],
  imports: [
    CommonModule,
    TagViewRoutingModule,
    SharedModule,
  ]
})
export class TagViewModule { }
