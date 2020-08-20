import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { ThemeService } from 'ng-arwes/services/public-api';
import { takeUntil } from 'rxjs/operators';

const ParagraphSelector = 'p[na-paragraph]';

@Component({
  selector: ParagraphSelector,
  template: `
<ng-content></ng-content>
`,
})
export class ParagraphComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private theme: NgArwesTheme | null = null;

  @HostBinding('style.margin') marginBottom = '0 0 0px';

  constructor(
    public themeSvc: ThemeService,
  ) {
    this.themeSvc.theme$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(theme => {
        this.deriveStyleFromTheme(theme);
        this.theme = theme;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  deriveStyleFromTheme(theme: NgArwesTheme = this.theme) {
    this.marginBottom = `0 0 ${theme.margin}px`;
  }

}
