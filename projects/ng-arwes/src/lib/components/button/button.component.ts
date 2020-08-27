import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import jss, { StyleSheet } from 'jss';
import { InputBoolean } from 'ng-arwes/tools';
import { NgArwesLayerStatusEnum } from 'ng-arwes/types/theme.enums';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { Subject, pipe, combineLatest } from 'rxjs';
import { ThemeService } from 'ng-arwes/services/public-api';
import { takeUntil } from 'rxjs/operators';
import { StyleService } from 'ng-arwes/services/style/style.service';
import { genButtonClassStyle, genButtonInstanceStyle, NgArwesButtonStyle } from './button.style';
import { CollectInput, CollectService } from 'ng-arwes/services/collect/collect.service';
import { ComponentStyleGenerator, genInstanceID } from 'ng-arwes/tools/style';
import { isFirstChange } from 'ng-arwes/tools/isFirstChange';

export interface ArwesButtonInput {
  show: boolean;
  animate: boolean;
  layer: NgArwesLayerStatusEnum;
  level: 0 | 1 | 2 | 3;
  disabled: boolean;
  active: boolean;
}

@Component({
  selector: 'na-button',
  template: `
    <div [class]="classes.root" (click)="onClick()">
      <na-frame
        [animate]="animate"
        hover
        [disabled]="disabled"
        [layer]="disabled ? 'disabled' : layer"
        [level]="level"
        [corners]="1"
        [active]="active"
        [show]="show"
      >
        <na-highlight [animate]="animate" [layer]="layer">
          <button [disabled]="disabled" [class]="classes.button">
            <ng-content></ng-content>
          </button>
        </na-highlight>
      </na-frame>
    </div>
  `,
})
export class ButtonComponent implements OnInit, OnDestroy, OnChanges {
  public theme: NgArwesTheme | null = null;
  public classes: Record<string, string>;

  private destroy$ = new Subject<void>();
  private sheet: StyleSheet<string>;

  @CollectInput()
  @Input()
  @InputBoolean()
  animate = false;

  @CollectInput()
  @Input()
  @InputBoolean()
  active = false;

  @CollectInput()
  @Input()
  @InputBoolean()
  disabled = false;

  @CollectInput()
  @Input()
  @InputBoolean()
  show = true;

  // @Input()
  @CollectInput()
  layer = NgArwesLayerStatusEnum.Control;

  @Input()
  @CollectInput()
  level: 0 | 1 | 2 | 3 = 2;

  @Output()
  readonly arwesClick = new EventEmitter<void>();

  constructor(
    private themeSvc: ThemeService,
    private style: StyleService,
    private collect: CollectService
  ) {
  }

  public onClick() {
    this.arwesClick.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isFirstChange(changes)) {
      return;
    }
    this.update();
  }

  ngOnInit() {
    this.themeSvc.theme$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((theme) => {
      this.theme = theme;
    });
    this.sheet = jss.createStyleSheet<string>(NgArwesButtonStyle, { link: true }).attach();
    this.classes = this.sheet.classes;
  }

  update() {
    if (this.sheet) {
      this.sheet.update({
        input: this.collect.gather<ArwesButtonInput>(this),
        theme: this.theme
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
