import { Component, OnInit, OnDestroy, OnChanges, Input, SimpleChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import jss, { StyleSheet } from 'jss';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  CollectInput,
  CollectService,
} from 'ng-arwes/services/collect/collect.service';
import { InputBoolean } from 'ng-arwes/tools';
import { NgArwesLayerStatusEnum } from 'ng-arwes/types/theme.enums';
import { ThemeService } from 'ng-arwes/services/public-api';
import { NgArwesImageStyle } from './image.style';
import { LoadService } from 'ng-arwes/services/load/load.service';
import { ResponsiveService } from 'ng-arwes/services/responsive/responsive.service';
import { getResponsiveResource } from 'ng-arwes/tools/resource';
import { isFirstChange } from 'ng-arwes/tools/isFirstChange';

export type ArwesImageResource =
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

export interface ArwesImageState {
  ready: boolean;
  resource: null | string;
  error: boolean;
}

const ArwesImageDefaultState = {
  ready: false,
  resource: null,
  error: false,
};

@Component({
  selector: 'na-image',
  styleUrls: ['./image.style.less'],
  template: `
    <figure [class]="classes.root" [class.ready]="state.ready">
      <na-frame [animate]="animate" [show]="show" [layer]="layer">
        <div [class]="classes.holder">
          <img
            *ngIf="state.resource"
            [src]="state.resource"
            [class]="classes.img"
          />
          <div *ngIf="state.error" [class]="classes.error">
            {{ i18n.error }}
          </div>
          <na-loading
            *ngIf="!state.ready && !state.error"
            full
            [animate]="animate"
            [show]="show"
            [layer]="layer"
          >
          </na-loading>
        </div>

        <div
          [hidden]="!hasChild"
          [class]="classes.separator"
          *ngIf="true"
        ></div>
        <figcaption
          [hidden]="!hasChild"
          [class]="classes.children"
          *ngIf="true"
        >
          <small #children class="description">
            <ng-content></ng-content>
          </small>
        </figcaption>
      </na-frame>
    </figure>
  `,
})
export class ImageComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  public state = this.getDefaultState();
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
  resources: ArwesImageResource;

  @Input()
  i18n: ArwesImageI18n = {
    error: 'Image error',
  };

  @ViewChild('children') children: ElementRef;

  get hasChild() {
    return Boolean(
      this.children && this.children.nativeElement.childNodes.length > 0
    );
  }

  constructor(
    private themeSvc: ThemeService,
    private collect: CollectService,
    private loader: LoadService,
    private responsive: ResponsiveService
  ) { }

  private getDefaultState(): ArwesImageState {
    return ArwesImageDefaultState;
  }

  /**
   * If enabled, load the resources provided.
   * It doesn't return the state of the loading, it will update the state.
   */
  public async loadResource() {
    const { resources, loadResources } = this;

    if (!loadResources) {
      return;
    }
    const responsive = this.responsive.get();
    const resource = getResponsiveResource(resources, responsive);

    this.state = this.getDefaultState();

    this.loader.loadAll({ images: [resource] }).then(
      () => {
        this.setState({ ready: true, resource });
      },
      () => {
        this.setState({ error: true });
      }
    );
  }

  private setState(state: Partial<ArwesImageState>) {
    Object.assign(this.state, state);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!isFirstChange(changes)) {
      this.update();

      if (
        changes.resources &&
        changes.resources.previousValue !== changes.resources.currentValue
      ) {
        this.loadResource();
      }
    }
  }

  ngAfterViewInit() {
    this.loadResource();
  }


  ngOnInit() {
    this.sheet = jss.createStyleSheet<string>(NgArwesImageStyle, { link: true }).attach();
    this.classes = this.sheet.classes;
    this.themeSvc.theme$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((theme) => {
      this.theme = theme;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  update() {
    if (this.sheet) {
      this.sheet.update({
        input: this.collect.gather<ArwesImageInput>(this),
        theme: this.theme
      });
    }
  }
}
