import { Pipe, PipeTransform } from '@angular/core';

const FOOT = 3.28084;

@Pipe({
  name: 'height'
})
export class HeightPipe implements PipeTransform {

  transform(value: number): unknown {
    const heigtInCm =  value * 10;
    const heigtInFoot = heigtInCm/FOOT;
    const fixedHeight = Number(heigtInFoot.toFixed(2))

    return `${Math.floor(fixedHeight)}'`;
  }

}
