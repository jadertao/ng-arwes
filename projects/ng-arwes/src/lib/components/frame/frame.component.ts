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
import { Subject, combineLatest } from 'rxjs';
import { InputBoolean } from 'ng-arwes/tools';
import { NgArwesLayerStatusEnum } from 'ng-arwes/types/theme.enums';
import { ThemeService } from 'ng-arwes/services/public-api';
import { takeUntil } from 'rxjs/operators';
import { NG_ARWES_SOUND_TOKEN } from 'ng-arwes/tools/sound';
import type { NgArwesSound } from 'ng-arwes/tools/sound';
import { DOCUMENT } from '@angular/common';
import { genFrameClassStyle, genFrameInstanceStyle } from './frame.style';
import {
  borderHeightMotion,
  borderWidthMotion,
  cornerMotion,
  boxMotion,
} from './frame.animation';
import { StyleService } from 'ng-arwes/services/style/style.service';
import { CollectInput, CollectService } from 'ng-arwes/services/collect/collect.service';
import { genInstanceID, ComponentStyleGenerator } from 'ng-arwes/tools/style';

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
    <div [class]="name+' '+id"  [@.disabled]="!animate" *ngIf="show">
      <div
        *ngIf="border"
        [@borderHeightMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="na-frame-border na-frame-border-left"
      ></div>
      <div
        *ngIf="border"
        [@borderHeightMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="na-frame-border na-frame-border-right"
      ></div>
      <div
        *ngIf="border"
        [@borderWidthMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="na-frame-border na-frame-border-top"
      ></div>
      <div
        *ngIf="border"
        [@borderWidthMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="na-frame-border na-frame-border-bottom"
      ></div>
      <div
        *ngIf="corners"
        [@cornerMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="na-frame-corner na-frame-cornerLT"
      ></div>
      <div
        *ngIf="corners"
        [@cornerMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="na-frame-corner na-frame-cornerLB"
      ></div>
      <div
        *ngIf="corners"
        [@cornerMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="na-frame-corner na-frame-cornerRT"
      ></div>
      <div
        *ngIf="corners"
        [@cornerMotion]="{ value: null, params: { animTime: theme.animTime }}"
        class="na-frame-corner na-frame-cornerRB"
      ></div>
      <div class="na-frame-box" [@boxMotion]="{ value: null, params: { animTime: theme.animTime }}">
        <div class="na-frame-children">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class FrameComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  public name = 'na-frame';
  public id = genInstanceID(this.name);
  public theme: NgArwesTheme | null = null;
  public styleUpdater: ComponentStyleGenerator<ArwesFrameInput>;


  private destroy$ = new Subject<void>();
  private change$ = new Subject<ArwesFrameInput>();
  private changed = false;


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
    private style: StyleService,
    private collect: CollectService,
    @Inject(NG_ARWES_SOUND_TOKEN) private sounds: NgArwesSound,
    @Inject(DOCUMENT) private doc: Document
  ) {
    this.styleUpdater = new ComponentStyleGenerator<ArwesFrameInput>(style)
      .info({ name: this.name, id: this.id })
      .forClass(genFrameClassStyle)
      .forInstance(genFrameInstanceStyle);

    const pipe$ = this.themeSvc.theme$.pipe(takeUntil(this.destroy$));
    pipe$.subscribe((theme) => {
      this.theme = theme;
      this.styleUpdater.updateClass({ theme });
    });

    combineLatest(this.change$, pipe$).subscribe(
      ([input, theme]) => { this.styleUpdater.updateInstance({ input, theme }); }
    );
  }

  ngOnInit() {  }


  ngAfterViewInit() {
    if (this.animate && this.show && this.sounds.deploy) {
      this.sounds.deploy.play();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const inputs = this.collect.gather<ArwesFrameInput>(this);
    this.change$.next(inputs);

    if (!this.changed) {
      this.changed = true;
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

}
