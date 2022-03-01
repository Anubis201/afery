import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(value: Date, arg: string = 'LLL'): string {
    const now = moment().locale('pl');
    const from = moment(value).locale('pl');

    if (from.diff(now, 'days') > -2) {
      return from.fromNow();
    } else {
      return from.format(arg);
    }
  }
}
