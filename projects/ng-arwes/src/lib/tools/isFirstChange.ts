import { SimpleChanges } from '@angular/core';

export function isFirstChange(changes: SimpleChanges): boolean {
  return Object.keys(changes).some(input => changes[input].isFirstChange);
}
