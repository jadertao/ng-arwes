import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { ThemeService } from 'ng-arwes/services/public-api';
import { StyleService } from 'ng-arwes/services/style.service';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { genListStyle } from './list.style';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

const ListSelector = 'dl[arwes-list], ol[arwes-list], ul[arwes-list]';

@Component({
  selector: ListSelector,
  styleUrls: ['./list.component.less'],
  template: '<ng-content></ng-content>',
})
export class ListComponent implements OnInit, OnDestroy {
  public theme: NgArwesTheme | null = null;
  private name = 'arwes-list';
  private destroy$ = new Subject<void>();

  @HostBinding('class')
  classes = 'arwes-list';

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
        // this.motion = {
        //   value: null,
        //   params: {
        //     animTime: theme?.animTime
        //   }
        // };
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
