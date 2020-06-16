import { Injectable } from '@angular/core';
class Storage {
  value = new Map<any, string[]>();
  constructor() {

  }
  set(target: any, value: string) {
    const _target = target.constructor || target;
    const inputs = this.value.get(_target) || [];
    inputs.push(value);
    this.value.set(_target, inputs);
  }
  gather<T>(instance: any): T | null {
    const inputs = this.value.get(instance.constructor || instance);
    if (!inputs) {
      return null;
    }
    return inputs.reduce((res, cur) => (
      res[cur] = (instance as any)[cur],
      res
    ), {} as T);
  }
}

const CollectStorage = new Storage();

export function CollectInput() {
  return function collect(target: any, input: string): any {
    CollectStorage.set(target, input);
  };
}


@Injectable({
  providedIn: 'root'
})
export class CollectService {

  public storage = CollectStorage;

  constructor() { }

  public gather<T>(instance: any): T | null {
    return CollectStorage.gather<T>(instance);
  }

}
