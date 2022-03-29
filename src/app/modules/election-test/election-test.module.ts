import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionTestRoutingModule } from './election-test-routing.module';
import { ElectionTestComponent } from './election-test.component';
import { SharedModule } from '../shared/shared.module';
import { StartPageComponent } from './start-page/start-page.component';


@NgModule({
  declarations: [
    ElectionTestComponent,
    StartPageComponent
  ],
  imports: [
    CommonModule,
    ElectionTestRoutingModule,
    SharedModule,
  ]
})
export class ElectionTestModule { }
