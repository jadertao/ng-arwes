import { NgArwesTheme } from './../../types/theme.interfaces';
import { takeUntil } from 'rxjs/operators';
import { NG_ARWES_SOUND_TOKEN } from './../../tools/sound';
import type { NgArwesSound } from './../../tools/sound';
import { ThemeService } from './../../services/theme.service';
import { NgArwesLayerStatusEnum } from './../../types/theme.enums';
import {
  Component,
  OnInit,
  Input,
  Inject,
  OnDestroy,
  ContentChildren,
  ViewChild,
  ElementRef,
  AfterContentInit,
  AfterViewChecked,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  NgZone,
} from '@angular/core';
import { Subject } from 'rxjs';
import { InputBoolean } from './../../tools';
import '../../polyfills/requestAnimationFrame.js';

@Component({
  selector: 'arwes-words',
  styleUrls: ['./words.component.less'],
  template: `
    <span
      class="arwes-words"
      [@.disabled]="!animate"
      [style.color]="theme.color[layer].base"
      >
      <span
        class="arwes-words-children"
        #children
        [style.opacity]="animating ? 0 : 1"
        >
        <ng-content></ng-content>
      </span>
      <span
        *ngIf="animating"
        class="arwes-words-text"
        [style.opacity]="animating ? 1 : 0"
        >
        {{ text }}
        <span
          class="arwes-words-blink"
          [innerHTML]="blinkText"
          [style.animation]="
            'arwes-words-blink ' + theme.animTime + 'ms step-end infinite'
          "
        ></span>
      </span>
    </span>
  `,
})
export class WordsComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  private destroy$ = new Subject<void>();

  public _text = '';
  public get text() {
    return this._text;
  }
  public set text(v) {
    this._text = v;
  }

  public theme: NgArwesTheme | null = null;
  // Current animation frame identifier.
  public currentAnimationFrame = null;
  public animating = false;

  @Input()
  blinkText = '&#9611;';

  @Input()
  layer = NgArwesLayerStatusEnum.Primary;

  @Input()
  @InputBoolean()
  show = true;

  @Input()
  @InputBoolean()
  animate = false;

  @ViewChild('children') _children: ElementRef;

  public get children(): string {
    return this._children ? this._children.nativeElement.textContent || '' : '';
  }

  constructor(
    private zone: NgZone,
    public themeSvc: ThemeService,
    @Inject(NG_ARWES_SOUND_TOKEN) private sounds: NgArwesSound
  ) {
    this.themeSvc.theme$.pipe(takeUntil(this.destroy$)).subscribe((theme) => {
      this.theme = theme;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.animate.isFirstChange()) {
      return;
    }
    const { animate, show, children } = this;

    const animateChanged = animate !== changes.animate.previousValue;
    const showChanged = show !== changes.show.previousValue;
    const childrenChanged = children !== changes.children.previousValue;

    // Animation changed
    if (animate) {
      if (showChanged) {
        show ? this.animateIn() : this.animateOut();
      } else if (childrenChanged) {
        this.animateIn();
      }
    }

    // Not animated anymore
    if (!animate && animateChanged) {
      this.stopAnimation();
    }
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.stopAnimation();
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    if (this.animate && this.show) {
      this.animateIn();
    }
  }

  cancelNextAnimation() {
    window.cancelAnimationFrame(this.currentAnimationFrame);
  }

  /**
   * Stop current animation and sounds.
   */
  stopAnimation() {
    this.cancelNextAnimation();
    this.animating = false;

    const { animate, sounds } = this;
    if (animate && sounds.typing) {
      sounds.typing.stop();
    }
  }

  startAnimation(isIn: boolean) {
    const { theme, animate, sounds, children } = this;
    if (children.length === 0) {
      return;
    }
    if (animate && sounds.typing) {
      sounds.typing.play();
    }

    // 1s / frames per second (FPS)
    // 60 FPS are the default in requestAnimationFrame
    const interval = 1000 / 60;
    // The time it will take to add/remove a character per frame
    const realDuration = interval * children.length;

    const duration = Math.min(realDuration, theme.animTime);

    this.cancelNextAnimation();
    this.animating = true;
    this.text = isIn ? '' : children;

    const length = children.length;
    let start = performance.now();
    let progress = null;
    const nextAnimation = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }

      progress = Math.max(timestamp - start, 0);

      if (!isIn) {
        progress = duration - progress;
      }

      // partialLength(n) = animationProgressDuration(ms)
      // textTotalLength(n) = totalDuration(ms)
      const newLength = Math.round((progress * length) / duration);
      const text = children.substring(0, newLength);

      this.text = text;

      const continueAnimation = isIn ? newLength <= length : newLength > 0;
      if (continueAnimation) {
        this.currentAnimationFrame = window.requestAnimationFrame(
          nextAnimation
        );
      } else {
        this.stopAnimation();
      }
    };

    this.currentAnimationFrame = window.requestAnimationFrame(nextAnimation);
  }

  animateIn() {
    this.cancelNextAnimation();
    this.startAnimation(true);
  }

  animateOut() {
    this.cancelNextAnimation();
    this.startAnimation(false);
  }
}
