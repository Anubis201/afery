import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MillionsPipe } from 'src/app/services/pipes/milions/millions.pipe';



@NgModule({
  declarations: [
    MillionsPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MillionsPipe
  ]
})
export class SharedModule { }
