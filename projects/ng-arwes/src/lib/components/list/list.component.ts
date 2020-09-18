import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ThemeService } from 'ng-arwes/services/public-api';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { NgArwesListStyles } from './list.style';
import jss, { StyleSheet } from 'jss';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const ListSelector = 'dl[na-list], ol[na-list], ul[na-list]';

@Component({
  selector: ListSelector,
  template: '<ng-content></ng-content>',
})
export class ListComponent implements OnInit, OnDestroy {
  public theme: NgArwesTheme | null = null;
  public classes: Record<string, string>;

  private destroy$ = new Subject<void>();
  private sheet: StyleSheet<string>;

  @HostBinding('class')
  get class() {
    if (!this.classes) {
      return 'na-list';
    }
    return `na-list ${this.classes.root}`;
  }

  constructor(
    public themeSvc: ThemeService,
  ) { }

  ngOnInit() {
    this.sheet = jss.createStyleSheet<string>(NgArwesListStyles, { link: true }).attach();
    this.classes = this.sheet.classes;

    this.themeSvc.theme$.pipe(takeUntil(this.destroy$)).subscribe(
      theme => this.theme = theme
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  update() {
    if (this.sheet) {
      this.sheet.update({
        theme: this.theme
      });
    }
  }
}
