import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MillionsPipe } from 'src/app/services/pipes/milions/millions.pipe';
import { TimeToReadPipe } from 'src/app/services/pipes/time-to-read/time-to-read.pipe';



@NgModule({
  declarations: [
    MillionsPipe,
    TimeToReadPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MillionsPipe,
    TimeToReadPipe,
  ]
})
export class SharedModule { }
