import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
  name: 'safestyle'
})
export class SafeStylePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, args?: any): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(value);
  }

}
