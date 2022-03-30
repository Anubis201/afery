import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectionTestRoutingModule } from './election-test-routing.module';
import { ElectionTestComponent } from './election-test.component';
import { SharedModule } from '../shared/shared.module';
import { StartPageComponent } from './start-page/start-page.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LevelComponent } from './level/level.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    ElectionTestComponent,
    StartPageComponent,
    LevelComponent,
    ResultPageComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    ElectionTestRoutingModule,
    MatCheckboxModule,
    SharedModule,
  ]
})
export class ElectionTestModule { }
