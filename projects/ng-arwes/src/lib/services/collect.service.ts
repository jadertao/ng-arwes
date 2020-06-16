import { Injectable } from '@angular/core';

const CollectStorage = (() => {
  class Storage {
    value = new Map<any, string[]>();
    constructor() {

    }
    set(target: any, value: string) {
      const inputs = this.value.get(target) || [];
      inputs.push(value);
      this.value.set(target, inputs);
    }
    gather<T>(instance: any): T | null {
      const inputs = instance.constructor ? this.value.get(instance.constructor) : null;
      if (!inputs) {
        return null;
      }
      return inputs.reduce((res, cur) => (
        res[cur] = (this as any)[cur],
        res
      ), {} as T);
    }
  }
  return new Storage();
})();

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

  public gather = CollectStorage.gather;

}
