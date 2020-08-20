import { rgba } from 'polished';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { NG_ARWES_SOUND_TOKEN } from './../../tools/sound';
import type { NgArwesSound } from './../../tools/sound';
import { NgArwesTheme } from './../../types/theme.interfaces';
import { ThemeService } from '../../services/theme/theme.service';
import { footerSeparatorMotion } from './footer.animation';
import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnDestroy,
  Inject,
  AfterViewInit,
  OnChanges,
  Optional,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean } from '../../tools';
import { isFirstChange } from 'ng-arwes/tools/isFirstChange';

const FooterSelector = 'na-footer';

@Component({
  selector: FooterSelector,
  animations: [footerSeparatorMotion],
  styleUrls: ['./footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <footer
      *ngIf="show"
      [@.disabled]="!animate"
      [style.background-color]="bgColor"
      class="na-footer"
    >
      <div
        *ngIf="show"
        class="na-footer-separator"
        [style.border-color]="theme.color.primary.dark"
        [@footerSeparatorMotion]="{
          value: null,
          params: {
            animTime: theme.animTime
          }
        }"
      >
      </div>
      <div *ngIf="show" class="na-footer-children">
        <ng-content></ng-content>
      </div>
    </footer>
  `,
})
export class FooterComponent implements OnDestroy, AfterViewInit, OnChanges {
  public theme: NgArwesTheme | null = null;
  private destroy$ = new Subject<void>();
  public bgColor: SafeStyle = 'transparent';

  @Input() @InputBoolean()
  show = true;

  @Input() @InputBoolean()
  animate = false;

  constructor(
    public themeSvc: ThemeService,
    public sanitizer: DomSanitizer,
    @Inject(NG_ARWES_SOUND_TOKEN) private sounds: NgArwesSound,
  ) {
    this.themeSvc.theme$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(theme => {
        this.theme = theme;
        this.bgColor = sanitizer.bypassSecurityTrustStyle(rgba(theme.background.primary.level0, theme.alpha));
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
    if (this.animate && changes.show && changes.show.previousValue !== this.show && this.sounds.deploy) {
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
