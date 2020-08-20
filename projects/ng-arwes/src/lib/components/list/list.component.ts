import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ThemeService } from 'ng-arwes/services/public-api';
import { StyleService } from 'ng-arwes/services/style/style.service';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { genListStyle } from './list.style';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const ListSelector = 'dl[na-list], ol[na-list], ul[na-list]';

@Component({
  selector: ListSelector,
  styleUrls: ['./list.component.less'],
  template: '<ng-content></ng-content>',
})
export class ListComponent implements OnInit, OnDestroy {
  public theme: NgArwesTheme | null = null;
  private name = 'na-list';
  private destroy$ = new Subject<void>();

  @HostBinding('class')
  classes = 'na-list';

  constructor(
    public themeSvc: ThemeService,
    private style: StyleService,
  ) {
    this.themeSvc.theme$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(theme => {
        this.theme = theme;
        this.applyTheme(theme);
      });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  applyTheme(theme: NgArwesTheme = this.theme) {
    if (!theme || !this.style) {
      return;
    }
    this.style.updateContent(this.name, genListStyle(theme));
  }
}
