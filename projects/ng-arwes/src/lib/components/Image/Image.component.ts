import { Component, OnInit, OnDestroy, OnChanges, Input } from '@angular/core';
import { genInstanceID, ComponentStyleGenerator } from 'ng-arwes/tools/style';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';
import {
  CollectInput,
  CollectService,
} from 'ng-arwes/services/collect/collect.service';
import { InputBoolean } from 'ng-arwes/tools';
import { NgArwesLayerStatusEnum } from 'ng-arwes/types/theme.enums';
import { ThemeService } from 'ng-arwes/services/public-api';
import { StyleService } from 'ng-arwes/services/style/style.service';
import { genImageClassStyle, genImageInstanceStyle } from './image.style';

type ArwesImageResource =
  | string
  | { small: string; medium: string; large: string; xlarge: string };

interface ArwesImageI18n {
  error: string;
}

export interface ArwesImageInput {
  show: boolean;
  animate: boolean;
  layer: NgArwesLayerStatusEnum;
  loadResources: boolean;
  i18n: ArwesImageI18n;
  resources: ArwesImageResource;
}

@Component({
  selector: 'arwes-image',
  template: `
    <figure [class]="name + ' ' + id" [class.ready]="ready">
      <arwes-frame [animate]="animate" [show]="show" [layer]="layer">
        <div [class]="name + '-holder'">
          <img [src]="resource" [class]="name + '-img'" />
          <div [class]="name + '-error'">{{ i18n.error }}</div>
          <arwes-loading
            [full]
            [animate]="animate"
            [show]="show"
            [layer]="layer"
          >
          </arwes-loading>
        </div>
        <div
          [class]="name + '-separator'"
          *ngIf="ref.children.length === 0"
        ></div>
        <figcaption
          [class]="name + '-children'"
          *ngIf="ref.children.length === 0"
        >
          <small #ref>
            <ng-content></ng-content>
          </small>
        </figcaption>
      </arwes-frame>
    </figure>
  `,
})
export class ImageComponent implements OnInit, OnDestroy, OnChanges {
  public name = 'arwes-image';
  public id = genInstanceID(this.name);
  public theme: NgArwesTheme | null = null;
  public styleUpdater: ComponentStyleGenerator<ArwesImageInput>;
  public resource = '';
  public ready = false;

  private destroy$ = new Subject<void>();
  private change$ = new Subject<ArwesImageInput>();

  @CollectInput()
  @Input()
  @InputBoolean()
  animate = false;

  @CollectInput()
  @Input()
  @InputBoolean()
  show = true;

  @CollectInput()
  @Input()
  @InputBoolean()
  loadResources = true;

  @Input()
  @CollectInput()
  layer = NgArwesLayerStatusEnum.Primary;

  @Input()
  resouces: ArwesImageResource;

  @Input()
  i18n: ArwesImageI18n;

  constructor(
    private themeSvc: ThemeService,
    private style: StyleService,
    private collect: CollectService
  ) {
    this.styleUpdater = new ComponentStyleGenerator<ArwesImageInput>(style)
      .info({ name: this.name, id: this.id })
      .forClass(genImageClassStyle)
      .forInstance(genImageInstanceStyle);

    const pipe$ = this.themeSvc.theme$.pipe(takeUntil(this.destroy$));
    pipe$.subscribe((theme) => {
      this.theme = theme;
      this.styleUpdater.updateClass({ theme });
    });

    combineLatest(this.change$, pipe$).subscribe(([input, theme]) => {
      this.styleUpdater.updateInstance({ input, theme });
    });
  }

  ngOnChanges() {
    const inputs = this.collect.gather<ArwesImageInput>(this);
    this.change$.next(inputs);
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
