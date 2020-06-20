import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { nanoid } from 'nanoid';
import { InputBoolean } from 'ng-arwes/tools';
import { NgArwesLayerStatusEnum } from 'ng-arwes/types/theme.enums';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { Subject } from 'rxjs';
import { ThemeService } from 'ng-arwes/services/public-api';
import { takeUntil } from 'rxjs/operators';
import { StyleService } from 'ng-arwes/services/style.service';
import { genButtonStyle } from './button.style';
import { CollectInput, CollectService } from 'ng-arwes/services/collect.service';

export interface ArwesButtonInput {
  show: boolean;
  animate: boolean;
  layer: NgArwesLayerStatusEnum;
  level: 0 | 1 | 2 | 3;
  disabled: boolean;
  active: boolean;
}

@Component({
  selector: 'arwes-button',
  styleUrls: ['./button.component.css'],
  template: `
    <div class="arwes-button" (click)="onClick()">
      <arwes-frame
        [animate]="animate"
        hover
        [disabled]="disabled"
        [layer]="disabled ? 'disabled' : layer"
        [level]="level"
        [corners]="1"
        [active]="active"
        [show]="show"
      >
        <arwes-highlight [animate]="animate" [layer]="layer">
          <button [disabled]="disabled" class="arwes-button-body">
            <ng-content></ng-content>
          </button>
        </arwes-highlight>
      </arwes-frame>
    </div>
  `,
})
export class ButtonComponent implements OnInit, OnDestroy {
  private name = 'arwes-button';
  private id = nanoid();
  public theme: NgArwesTheme | null = null;
  private destroy$ = new Subject<void>();

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
    this.themeSvc.theme$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((theme) => {
      this.applyTheme(theme);
      this.theme = theme;
    });
  }

  public onClick() {
    this.arwesClick.emit();
  }

  applyTheme(theme: NgArwesTheme = this.theme) {
    if (!theme || !this.style) {
      return;
    }
    // this.style.updateContent(this.name, genButtonStyle(theme, this.input));
  }

  ngOnInit() {
    console.log(this.collect.gather(this));
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
