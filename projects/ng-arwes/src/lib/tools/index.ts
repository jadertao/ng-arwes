import { _isNumberValue, coerceBooleanProperty, coerceCssPixelValue } from '@angular/cdk/coercion';
import { propDecoratorFactory } from './decorator';

export function toBoolean(value: boolean | string): boolean {
  return coerceBooleanProperty(value);
}
export function InputBoolean(): any {
  return propDecoratorFactory('InputBoolean', toBoolean);
}
