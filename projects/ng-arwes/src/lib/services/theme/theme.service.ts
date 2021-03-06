import { NgArwesModule } from '../../ng-arwes.module';
import { DEFAULT_THEME, NG_ARWES_THEME_TOKEN } from '../../tools/theme';
import { NgArwesTheme } from '../../types/theme.interfaces';
import { Injectable, Inject } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { mergeDeep } from '../../tools/merge';
import { StyleService } from '../style/style.service';
import { delay } from 'rxjs/operators';

const UpdateCallbacks: Record<string, (data: { name: string, theme: NgArwesTheme }) => string> = {};


export const setCallback = (name: string, fn: (data: { name: string, theme: NgArwesTheme }) => string) => {
  UpdateCallbacks[name] = fn;
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private emitter: BehaviorSubject<NgArwesTheme>;
  public theme: NgArwesTheme;

  constructor(
    @Inject(NG_ARWES_THEME_TOKEN) private themeConfig: NgArwesTheme,
    private style: StyleService,
  ) {
    this.theme = themeConfig;
    this.emitter = new BehaviorSubject(themeConfig);
  }

  setCallback = setCallback;

  setTheme(theme: Partial<NgArwesTheme>) {
    this.theme = mergeDeep(DEFAULT_THEME, theme);
    this.emitter.next(this.theme);
  }

  get theme$() {
    return this.emitter.asObservable();
  }
}
