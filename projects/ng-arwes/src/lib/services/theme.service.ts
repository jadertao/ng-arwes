import { NgArwesModule } from './../ng-arwes.module';
import { DEFAULT_THEME, NG_ARWES_THEME_TOKEN } from './../tools/theme';
import { NgArwesTheme } from './../types/theme';
import { Injectable, Inject } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { mergeDeep } from '../tools/merge';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private Theme: BehaviorSubject<NgArwesTheme>;

  constructor(@Inject(NG_ARWES_THEME_TOKEN) private themeConfig: NgArwesTheme) {
    this.Theme = new BehaviorSubject(themeConfig);
  }

  setTheme(theme: Partial<NgArwesTheme>) {
    this.Theme.next(mergeDeep(DEFAULT_THEME, theme));
  }

  get theme$() {
    return this.Theme.asObservable();
  }
}
