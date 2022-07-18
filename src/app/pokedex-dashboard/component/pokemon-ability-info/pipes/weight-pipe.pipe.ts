import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weightPipe'
})
export class WeightPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value} lbs`;
  }

}
