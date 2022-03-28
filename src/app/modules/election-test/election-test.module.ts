import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionTestRoutingModule } from './election-test-routing.module';
import { ElectionTestComponent } from './election-test.component';


@NgModule({
  declarations: [
    ElectionTestComponent
  ],
  imports: [
    CommonModule,
    ElectionTestRoutingModule
  ]
})
export class ElectionTestModule { }
