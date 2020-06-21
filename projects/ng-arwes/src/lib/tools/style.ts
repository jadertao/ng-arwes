import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';

export function styleObject2String(style: Record<string, string | number>) {
  return Object.keys(style).reduce((res, key) => {
    return `${res} ${key}:${style[key]};`;
  }, '');
}

export type ComponentClassFn = (params: { name: string, theme: NgArwesTheme }) => string;
export type ComponentInstanceFn<T> = (params: { name: string, id: string, theme: NgArwesTheme, input: T }) => string;

export class ComponentStyleGenerator<T> {
  public name: string;
  public id: string;
  public genInstanceStyle: ComponentInstanceFn<T> | null = null;
  public genClassStyle: ComponentClassFn | null = null;
  constructor() { }

  info(name: string, id: string) {
    this.name = name;
    this.id = id;
    return this;
  }

  forClass(fn: ComponentClassFn) {
    this.genClassStyle = fn;
    return this;
  }
  forInstance(fn: ComponentInstanceFn<T>) {
    this.genInstanceStyle = fn;
    return this;
  }
}
