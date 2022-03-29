import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionTestRoutingModule } from './election-test-routing.module';
import { ElectionTestComponent } from './election-test.component';
import { SharedModule } from '../shared/shared.module';
import { StartPageComponent } from './start-page/start-page.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LevelComponent } from './level/level.component';

@NgModule({
  declarations: [
    ElectionTestComponent,
    StartPageComponent,
    LevelComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    ElectionTestRoutingModule,
    SharedModule,
  ]
})
export class ElectionTestModule { }
