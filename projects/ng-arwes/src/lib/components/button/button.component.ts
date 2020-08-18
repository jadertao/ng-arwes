import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges } from '@angular/core';
import { nanoid } from 'nanoid';
import { InputBoolean } from 'ng-arwes/tools';
import { NgArwesLayerStatusEnum } from 'ng-arwes/types/theme.enums';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { Subject, pipe, combineLatest } from 'rxjs';
import { ThemeService } from 'ng-arwes/services/public-api';
import { takeUntil } from 'rxjs/operators';
import { StyleService } from 'ng-arwes/services/style/style.service';
import { genButtonClassStyle, genButtonInstanceStyle, genButtonStyle } from './button.style';
import { CollectInput, CollectService } from 'ng-arwes/services/collect/collect.service';
import { ComponentStyleGenerator, genInstanceID } from 'ng-arwes/tools/style';

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
  template: `
    <div [class]="name+' '+id" (click)="onClick()">
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
export class ButtonComponent implements OnInit, OnDestroy, OnChanges {
  public name = 'arwes-button';
  public id = genInstanceID(this.name);
  public theme: NgArwesTheme | null = null;
  public styleUpdater: ComponentStyleGenerator<ArwesButtonInput>;
  private destroy$ = new Subject<void>();
  private change$ = new Subject<ArwesButtonInput>();


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
    this.styleUpdater = new ComponentStyleGenerator<ArwesButtonInput>(style)
      .info({ name: this.name, id: this.id })
      .forClass(genButtonClassStyle)
      .forInstance(genButtonInstanceStyle);

    const pipe$ = this.themeSvc.theme$.pipe(
      takeUntil(this.destroy$)
    );
    pipe$.subscribe((theme) => {
      this.theme = theme;
      this.styleUpdater.updateClass({ theme });
    });

    combineLatest(
      this.change$,
      pipe$
    ).subscribe(([input, theme]) => {
      this.styleUpdater.updateInstance({ input, theme });
    });

  }

  public onClick() {
    this.arwesClick.emit();
  }

  ngOnChanges() {
    const inputs = this.collect.gather<ArwesButtonInput>(this);
    this.change$.next(inputs);
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
