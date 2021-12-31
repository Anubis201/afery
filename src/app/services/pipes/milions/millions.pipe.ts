import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millions'
})
export class MillionsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
