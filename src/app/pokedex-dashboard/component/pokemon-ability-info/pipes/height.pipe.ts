import { Pipe, PipeTransform } from '@angular/core';

const FOOT = 0.0328084;
const DECIMAL_PART = (num: number) => {
  if(Number.isInteger(num)) {
    return 0
  }
  return `${num.toString().split('.')[1]}"`
}

@Pipe({
  name: 'height'
})
export class HeightPipe implements PipeTransform {

  transform(value: number): unknown {
    const heigtInCm =  value * 10;
    const heigtInFoot = heigtInCm*FOOT;
    const fixedHeight = Number(heigtInFoot.toFixed(2))
    console.log('fixedHeight', heigtInFoot)

    return `${Math.floor(fixedHeight)}' ${DECIMAL_PART(fixedHeight)}`;
  }

}
