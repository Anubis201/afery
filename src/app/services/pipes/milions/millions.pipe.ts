import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millions'
})
export class MillionsPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    // jesli wartosc jest miliardowa
    const bilion = value / 1_000_000_000;
    if (bilion >= 1) {
      const value = bilion.toFixed(2).slice(-2) === '00' ? Math.round(bilion) : bilion.toFixed(2);
      return value + ' MLD ZŁ';
    }

    // jesli wartosc jest milionowa
    const milion = value / 1_000_000;
    if (milion >= 1) {
      return Math.round(milion) + ' MLN ZŁ';
    }

    return value + ' ZŁ';
  }

}
