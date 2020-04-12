import { NG_ARWES_SOUND_TOKEN } from './../../tools/sound';
import type { NgArwesSound } from './../../tools/sound';
import { NgArwesTheme } from './../../types/theme.interfaces';
import { ThemeService } from './../../services/theme.service';
import { footerSeparatorMotion } from './footer.animation';
import { NgArwesLayerStatusEnum } from '../../types/theme.enums';
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

const FooterSelector = 'footer[arwes-footer]';

@Component({
  selector: FooterSelector,
  animations: [footerSeparatorMotion],
  styleUrls: ['./footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      *ngIf="show"
      class="arwes-footer"
      [@.disabled]="!animate"
    >
      <div
        *ngIf="show"
        class="arwes-footer-separator"
        [style.border-color]="theme.color.primary.dark"
        [@footerSeparatorMotion]="{
          value: null,
          params: {
            backgroundColor: theme.background.primary.level0,
            alpha: theme.alpha,
            animTime: theme.animTime
          }
        }"
      >
      </div>
      <div *ngIf="show" class="arwes-footer-children">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class FooterComponent implements OnDestroy, AfterViewInit, OnChanges {
  public theme: NgArwesTheme | null = null;
  private destroy$ = new Subject<void>();

  @Input() @InputBoolean()
  show = true;

  @Input() @InputBoolean()
  animate = false;

  constructor(
    public themeSvc: ThemeService,
    @Optional() @Inject(NG_ARWES_SOUND_TOKEN) private sounds: NgArwesSound,
  ) {
    this.themeSvc.theme$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(theme => {
        this.theme = theme;
      });
  }

  ngAfterViewInit() {
    if (this.animate && this.show && this.sounds.deploy) {
      this.sounds.deploy.play();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.animate && changes.animate.isFirstChange()) {
      return;
    }
    if (this.animate && changes.show && changes.show.previousValue !== this.show && this.sounds.deploy) {
      this.sounds.deploy.play();
    }
  }

  ngOnDestroy(): void {
    if (this.animate && this.sounds.deploy) {
      this.sounds.deploy.play();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

}
