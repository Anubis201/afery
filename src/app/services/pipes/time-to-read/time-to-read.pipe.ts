import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeToRead'
})
export class TimeToReadPipe implements PipeTransform {

  transform(value: string): number {
    return Math.round(value.match(/(\w+)/g)?.length as number / 200) || 1;
  }

}
