import { Component, OnInit, OnDestroy, OnChanges, Input, SimpleChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
  selector: 'arwes-image',
  styleUrls: ['./image.style.less'],
  template: `
    <figure [class]="name + ' ' + id" [class.ready]="state.ready">
      <arwes-frame [animate]="animate" [show]="show" [layer]="layer">
        <div [class]="name + '-holder'">
          <img
            *ngIf="state.resource"
            [src]="state.resource"
            [class]="name + '-img'"
          />
          <div *ngIf="state.error" [class]="name + '-error'">
            {{ i18n.error }}
          </div>
          <arwes-loading
            *ngIf="!state.ready && !state.error"
            full
            [animate]="animate"
            [show]="show"
            [layer]="layer"
          >
          </arwes-loading>
        </div>

        <div
          [hidden]="!hasChild"
          [class]="name + '-separator'"
          *ngIf="true"
        ></div>
        <figcaption
          [hidden]="!hasChild"
          [class]="name + '-children'"
          *ngIf="true"
        >
          <small #children class="description">
            <ng-content></ng-content>
          </small>
        </figcaption>
      </arwes-frame>
    </figure>
  `,
})
export class ImageComponent
  implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public name = 'arwes-image';
  public id = genInstanceID(this.name);
  public theme: NgArwesTheme | null = null;
  public styleUpdater: ComponentStyleGenerator<ArwesImageInput>;

  public state = this.getDefaultState();

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
    private style: StyleService,
    private collect: CollectService,
    private loader: LoadService,
    private responsive: ResponsiveService
  ) {
    console.log(this);
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
    const inputs = this.collect.gather<ArwesImageInput>(this);
    this.change$.next(inputs);
    if (isFirstChange(changes)) {
      return;
    }
    if (
      changes.resources &&
      changes.resources.previousValue !== changes.resources.currentValue
    ) {
      this.loadResource();
    }
  }

  ngAfterViewInit() {
    this.loadResource();
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
