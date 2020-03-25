import { NgArwesModule } from './../ng-arwes.module';
import { DEFAULT_THEME } from './../tools/theme';
import { NgArwesTheme } from './../types/theme';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { mergeDeep } from '../tools/merge';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private Theme: BehaviorSubject<NgArwesTheme> = new BehaviorSubject(DEFAULT_THEME);
  constructor() { }

  setTheme(theme: Partial<NgArwesTheme>) {
    this.Theme.next(mergeDeep(DEFAULT_THEME, theme));
  }

  get theme() {
    return this.Theme.asObservable();
  }
}
