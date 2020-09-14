import {
  Component,
  OnInit,
  OnDestroy,
  Input,
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
import { NgArwesFrameStyle } from './frame.style';
import {
  borderHeightMotion,
  borderWidthMotion,
  cornerMotion,
  boxMotion,
} from './frame.animation';
import { CollectInput, CollectService } from 'ng-arwes/services/collect/collect.service';
import jss, { StyleSheet } from 'jss';
import { isFirstChange } from 'ng-arwes/tools/isFirstChange';

const FrameSelector = 'na-frame';

export interface ArwesFrameInput {
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
  animations: [borderHeightMotion, borderWidthMotion, cornerMotion, boxMotion],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="classes.root"  [@.disabled]="!animate" *ngIf="show">
      <div
        *ngIf="border"
        [@borderHeightMotion]="{ value: null, params: { animTime: theme.animTime }}"
        [class]="classes.border + ' ' + classes.borderLeft"
      ></div>
      <div
        *ngIf="border"
        [@borderHeightMotion]="{ value: null, params: { animTime: theme.animTime }}"
        [class]="classes.border + ' ' + classes.borderRight"
      ></div>
      <div
        *ngIf="border"
        [@borderWidthMotion]="{ value: null, params: { animTime: theme.animTime }}"
        [class]="classes.border + ' ' + classes.borderTop"
      ></div>
      <div
        *ngIf="border"
        [@borderWidthMotion]="{ value: null, params: { animTime: theme.animTime }}"
        [class]="classes.border + ' ' + classes.borderBottom"
      ></div>
      <div
        *ngIf="corners"
        [@cornerMotion]="{ value: null, params: { animTime: theme.animTime }}"
        [class]="classes.corner + ' ' + classes.cornerLT"
      ></div>
      <div
        *ngIf="corners"
        [@cornerMotion]="{ value: null, params: { animTime: theme.animTime }}"
        [class]="classes.corner + ' ' + classes.cornerLB"
      ></div>
      <div
        *ngIf="corners"
        [@cornerMotion]="{ value: null, params: { animTime: theme.animTime }}"
        [class]="classes.corner + ' ' + classes.cornerRT"
      ></div>
      <div
        *ngIf="corners"
        [@cornerMotion]="{ value: null, params: { animTime: theme.animTime }}"
        [class]="classes.corner + ' ' + classes.cornerRB"
      ></div>
      <div [class]="classes.box" [@boxMotion]="{ value: null, params: { animTime: theme.animTime }}">
        <div [class]="classes.children">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class FrameComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  public _theme: NgArwesTheme | null = null;
  get theme() {
    return this._theme;
  }
  set theme(v) {
    this._theme = v;
    this.update();
  }


  public classes: Record<string, string>;

  private destroy$ = new Subject<void>();
  private sheet: StyleSheet<string>;


  @CollectInput()
  @Input()
  @InputBoolean()
  show = true;

  @CollectInput()
  @Input()
  @InputBoolean()
  border = true;

  @Input()
  @InputBoolean()
  animate = true;

  @CollectInput()
  @Input()
  layer = NgArwesLayerStatusEnum.Primary;

  @CollectInput()
  @Input()
  corners: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0;

  @CollectInput()
  @Input()
  level: 0 | 1 | 2 | 3 = 0;

  @CollectInput()
  @Input()
  @InputBoolean()
  disabled = false;

  @CollectInput()
  @Input()
  @InputBoolean()
  active = false;

  @CollectInput()
  @Input()
  @InputBoolean()
  hover = true;

  @CollectInput()
  @Input()
  @InputBoolean()
  noBackground = false;

  constructor(
    private themeSvc: ThemeService,
    private collect: CollectService,
    @Inject(NG_ARWES_SOUND_TOKEN) private sounds: NgArwesSound,
    @Inject(DOCUMENT) private doc: Document
  ) { }

  ngOnInit() {
    this.sheet = jss.createStyleSheet<string>(NgArwesFrameStyle, { link: true }).attach();
    this.classes = this.sheet.classes;
    this.themeSvc.theme$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((theme) => {
      this.theme = theme;
    });
  }


  ngAfterViewInit() {
    if (this.animate && this.show && this.sounds.deploy) {
      this.sounds.deploy.play();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.animate && changes.show && changes.show.previousValue !== this.show && this.sounds.deploy) {
      this.sounds.deploy.play();
    }
    if (!isFirstChange(changes)) {
      this.update();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  update() {
    if (this.sheet) {
      this.sheet.update({
        input: this.collect.gather<ArwesFrameInput>(this),
        theme: this.theme
      });
    }
  }

}
