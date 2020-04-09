import { Pipe, PipeTransform } from '@angular/core';
import { rgba } from 'polished';

@Pipe({
  name: 'rgba'
})
export class RgbaPipe implements PipeTransform {

  transform(value: any, args?: any) {
    return rgba(value, args);
  }

}
