import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ElementRef,
  Renderer2,
  Inject,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  SimpleChanges,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { Subject } from 'rxjs';
import { InputBoolean } from 'ng-arwes/tools';
import { NgArwesLayerStatusEnum } from 'ng-arwes/types/theme.enums';
import { ThemeService } from 'ng-arwes/services/public-api';
import { takeUntil } from 'rxjs/operators';
import { NG_ARWES_SOUND_TOKEN } from 'ng-arwes/tools/sound';
import type { NgArwesSound } from 'ng-arwes/tools/sound';
import { DOCUMENT } from '@angular/common';
import { genFrameStyle } from './frame.style';
import {
  borderHeightMotion,
  borderWidthMotion,
  cornerMotion,
  boxMotion,
} from './frame.animation';

const FrameSelector = 'arwes-frame';

export interface FrameInput {
  show: boolean;
  border: boolean;
  layer: NgArwesLayerStatusEnum;
  corners: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  level: 0 | 1 | 2 | 3;
  disabled: boolean;
  active: boolean;
  hover: boolean;
  noBackground: boolean;
}

@Component({
  selector: FrameSelector,
  styleUrls: ['./frame.component.less'],
  animations: [borderHeightMotion, borderWidthMotion, cornerMotion, boxMotion],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="arwes-frame" [@.disabled]="!animate" *ngIf="show">
      <div
        *ngIf="border"
        [@borderHeightMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="arwes-frame-border arwes-frame-border-left"
      ></div>
      <div
        *ngIf="border"
        [@borderHeightMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="arwes-frame-border arwes-frame-border-right"
      ></div>
      <div
        *ngIf="border"
        [@borderWidthMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="arwes-frame-border arwes-frame-border-top"
      ></div>
      <div
        *ngIf="border"
        [@borderWidthMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="arwes-frame-border arwes-frame-border-bottom"
      ></div>
      <div
        *ngIf="corners"
        [@cornerMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="arwes-frame-corner arwes-frame-cornerLT"
      ></div>
      <div
        *ngIf="corners"
        [@cornerMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="arwes-frame-corner arwes-frame-cornerLB"
      ></div>
      <div
        *ngIf="corners"
        [@cornerMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="arwes-frame-corner arwes-frame-cornerRT"
      ></div>
      <div
        *ngIf="corners"
        [@cornerMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="arwes-frame-corner arwes-frame-cornerRB"
      ></div>
      <div class="arwes-frame-box" [@boxMotion]="{ value: null, params: { animTime: theme.animTime }}">
        <div class="arwes-frame-children">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class FrameComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  public theme: NgArwesTheme | null = null;
  private destroy$ = new Subject<void>();
  private style: HTMLStyleElement | null = null;

  @Input()
  @InputBoolean()
  show = true;

  @Input()
  @InputBoolean()
  border = true;

  @Input()
  @InputBoolean()
  animate = true;

  @Input()
  layer = NgArwesLayerStatusEnum.Primary;

  @Input()
  corners: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;

  @Input()
  level: 0 | 1 | 2 | 3 = 0;

  @Input()
  @InputBoolean()
  disabled = false;

  @Input()
  @InputBoolean()
  active = false;

  @Input()
  @InputBoolean()
  hover = true;

  @Input()
  @InputBoolean()
  noBackground = false;

  get input(): FrameInput {
    return {
      show: this.show,
      border: this.border,
      layer: this.layer,
      corners: this.corners,
      level: this.level,
      disabled: this.disabled,
      active: this.active,
      hover: this.hover,
      noBackground: this.noBackground,
    };
  }

  constructor(
    private elementRef: ElementRef,
    private themeSvc: ThemeService,
    private renderer: Renderer2,
    @Inject(NG_ARWES_SOUND_TOKEN) private sounds: NgArwesSound,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.initTag();
    this.themeSvc.theme$.pipe(takeUntil(this.destroy$)).subscribe((theme) => {
      this.theme = theme;
    });
  }

  ngOnInit() {
    console.log(this);
    this.themeSvc.theme$.pipe(takeUntil(this.destroy$)).subscribe((theme) => {
      this.applyTheme(theme);
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
    this.destroy$.next();
    this.destroy$.complete();
  }

  initTag() {
    const el = this.doc.querySelector<HTMLStyleElement>(
      'head .arwes-frame-theme'
    );
    if (el) {
      this.style = el;
    } else {
      const style: HTMLStyleElement = this.doc.createElement('style');
      style.type = 'text/css';
      style.className = 'arwes-frame-theme';
      style.appendChild(this.doc.createTextNode(''));
      this.doc.head.appendChild(style);
      this.style = style;
    }
  }
  applyTheme(theme: NgArwesTheme = this.theme) {
    let str = '';
    if (!theme || !this.style) {
      return;
    }
    str = genFrameStyle(theme, this.input);
    this.style.innerHTML = str;
  }
}
