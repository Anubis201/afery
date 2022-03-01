import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: Date, ...args: unknown[]): string {
    const now = new Date();

    console.log(value.getSeconds())

    return this.datePipe.transform(value, 'yyyy-MM-dd');
  }
}
