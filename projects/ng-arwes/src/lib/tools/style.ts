import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { setCallback } from 'ng-arwes/services/theme/theme.service';
import { StyleService } from 'ng-arwes/services/style/style.service';
import { nanoid } from 'nanoid';

export function styleObject2String(style: Record<string, string | number>) {
  return Object.keys(style).reduce((res, key) => {
    return `${res} ${key}:${style[key]};`;
  }, '');
}

export function genInstanceID(name: string): string {
  return `${name}-${nanoid()}`;
}

export type ComponentClassFn = (params: { name: string, theme: NgArwesTheme }) => string;
export type ComponentInstanceFn<T> = (params: { name: string, id: string, theme: NgArwesTheme, input: T }) => string;

export class ComponentStyleGenerator<T> {
  public name: string;
  public id: string;
  public genInstanceStyle: ComponentInstanceFn<T> | null = null;
  public genClassStyle: ComponentClassFn | null = null;
  constructor(
    public style: StyleService
  ) { }

  info(data: { name: string, id: string }) {
    this.name = data.name;
    this.id = data.id;
    return this;
  }

  forClass(fn: ComponentClassFn) {
    this.genClassStyle = fn;
    setCallback(this.name, fn);
    return this;
  }
  forInstance(fn: ComponentInstanceFn<T>) {
    this.genInstanceStyle = fn;
    return this;
  }
  updateClass(data: { theme: NgArwesTheme }) {
    const { name } = this;
    const { theme } = data;
    if (this.genClassStyle) {
      this.style.updateContent(name, this.genClassStyle({ name, theme }));
    }
    return this;
  }
  updateInstance(data: { input: T, theme: NgArwesTheme }) {
    const { id, name } = this;
    const { input, theme } = data;
    if (this.genInstanceStyle) {
      this.style.updateContent(id, this.genInstanceStyle({ id, name, theme, input }));
    }
    return this;
  }
  update(data: { input: T, theme: NgArwesTheme }) {
    const { id, name } = this;
    const { input, theme } = data;
    if (this.genClassStyle) {
      this.style.updateContent(name, this.genClassStyle({ name, theme }));
    }
    if (this.genInstanceStyle) {
      this.style.updateContent(id, this.genInstanceStyle({ id, name, theme, input }));
    }
    return this;
  }
}
