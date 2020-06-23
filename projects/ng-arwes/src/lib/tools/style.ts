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

  info(data: { name: string, id: string }) {
    this.name = data.name;
    this.id = data.id;
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
  updateClass(data: { input: T, theme: NgArwesTheme }) {
    const { id, name } = this;
    const { input, theme } = data;
    if (this.genClassStyle) {
      this.genClassStyle({ name, theme });
    }
    return this;
  }
  updateInstance(data: { input: T, theme: NgArwesTheme }) {
    const { id, name } = this;
    const { input, theme } = data;
    if (this.genInstanceStyle) {
      this.genInstanceStyle({ id, name, theme, input });
    }
    return this;
  }
  update(data: { input: T, theme: NgArwesTheme }) {
    const { id, name } = this;
    const { input, theme } = data;
    if (this.genClassStyle) {
      this.genClassStyle({ name, theme });
    }
    if (this.genInstanceStyle) {
      this.genInstanceStyle({ id, name, theme, input });
    }
    return this;
  }
}
