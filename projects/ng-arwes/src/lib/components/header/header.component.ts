import { headerSeparatorMotion } from './header.animation';
import { rgba } from 'polished';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnDestroy,
  Inject,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemeService } from 'ng-arwes/services/public-api';
import { InputBoolean } from 'ng-arwes/tools';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { NG_ARWES_SOUND_TOKEN } from 'ng-arwes/tools/sound';
import type { NgArwesSound } from 'ng-arwes/tools/sound';
import { isFirstChange } from 'ng-arwes/tools/isFirstChange';

const HeaderSelector = 'arwes-header';

@Component({
  selector: HeaderSelector,
  animations: [headerSeparatorMotion],
  styleUrls: ['./header.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      *ngIf="show"
      [@.disabled]="!animate"
      [style.background-color]="bgColor"
      class="arwes-header"
    >
      <div *ngIf="show" class="arwes-header-children">
        <ng-content></ng-content>
      </div>
      <div
        *ngIf="show"
        class="arwes-header-separator"
        [style.border-color]="theme.color.primary.dark"
        [@headerSeparatorMotion]="{
          value: null,
          params: {
            animTime: theme.animTime
          }
        }"
      ></div>
    </header>
  `,
})
export class HeaderComponent implements OnDestroy, AfterViewInit, OnChanges {
  public theme: NgArwesTheme | null = null;
  private destroy$ = new Subject<void>();
  public bgColor: SafeStyle = 'transparent';

  @Input()
  @InputBoolean()
  show = true;

  @Input()
  @InputBoolean()
  animate = false;

  constructor(
    public themeSvc: ThemeService,
    public sanitizer: DomSanitizer,
    @Inject(NG_ARWES_SOUND_TOKEN) private sounds: NgArwesSound
  ) {
    this.themeSvc.theme$.pipe(takeUntil(this.destroy$)).subscribe((theme) => {
      this.theme = theme;
      this.bgColor = sanitizer.bypassSecurityTrustStyle(
        rgba(theme.background.primary.level0, theme.alpha)
      );
    });
  }
  ngAfterViewInit() {
    if (this.animate && this.show && this.sounds.deploy) {
      this.sounds.deploy.play();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isFirstChange(changes)) {
      return;
    }
    if (
      this.animate &&
      changes.show &&
      changes.show.previousValue !== this.show &&
      this.sounds.deploy
    ) {
      this.sounds.deploy.play();
    }
  }

  ngOnDestroy(): void {
    if (this.animate && this.sounds.deploy) {
      this.sounds.deploy.stop();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
