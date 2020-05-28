import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
import { InputBoolean } from 'ng-arwes/tools';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { ThemeService } from 'ng-arwes/services/public-api';
import { StyleService } from 'ng-arwes/services/style.service';
import { takeUntil } from 'rxjs/operators';
import { genPuffStyle } from './puff.style';
import { Subject } from 'rxjs';

@Component({
  selector: 'arwes-puff',
  styleUrls: ['./puff.component.less'],
  template: `
  <div class="arwes-puff" #root>
    <div class="arwes-puff-children">
      <ng-content></ng-content>
    </div>
  </div>
  `,
})
export class PuffComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public theme: NgArwesTheme | null = null;
  private name = 'arwes-puff';
  private destroy$ = new Subject<void>();
  private _quantity = 8;
  private puffTimeout: number | null = null;
  private puffElementsTimeout: number | null = null;

  @ViewChild('root')
  root: ElementRef<HTMLDivElement>;

  @Input()
  puffInterval = 5000;

  @Input()
  set quantity(val: number) {
    this._quantity = val;
  }

  get quantity(): number {
    return this._quantity;
  }

  @Input() @InputBoolean()
  animate = true;

  constructor(
    public themeSvc: ThemeService,
    private style: StyleService,
  ) {
    this.themeSvc.theme$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(theme => {
        this.theme = theme;
        this.applyTheme(theme);
      });
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.animate) {
      this.startAnimations();
    }
  }
  ngOnDestroy() {
    this.stopAnimations();
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.animate && changes.animate.isFirstChange()) {
      return;
    }
    if (changes.animate.previousValue !== this.animate) {
      if (this.animate) {
        this.startAnimations();
      } else {
        this.stopAnimations();
      }
    }
  }

  applyTheme(theme: NgArwesTheme = this.theme) {
    if (!theme || !this.style) {
      return;
    }
    this.style.updateContent(this.name, genPuffStyle(theme));
  }
  stopAnimations() {
    clearInterval(this.puffTimeout);
    clearTimeout(this.puffElementsTimeout);
  }
  startAnimations() {
    this.onPuffs();
    this.puffTimeout = window.setInterval(this.onPuffs, this.puffInterval);
  }
  onPuffs = () => {
    const puffs = [];
    for (let i = 0; i < this.quantity; i++) {
      puffs.push(this.createPuff());
    }

    puffs.forEach(puff => this.root.nativeElement.appendChild(puff));

    this.puffElementsTimeout = window.setTimeout(() => {
      puffs.forEach(puff => puff.remove());
    }, this.puffInterval - 100);
  }

  createPuff() {
    const puff = document.createElement('div');

    const isLong = Math.round(Math.random());

    puff.setAttribute('class', `arwes-puff-item${isLong ? ' puff-long' : ''}`);

    const duration = 1000 + Math.round(Math.random() * 3000);
    puff.style.animationDuration = duration + 'ms';

    const width = this.root.nativeElement.offsetWidth;
    const height = this.root.nativeElement.offsetHeight;
    puff.style.left = 50 + Math.round(Math.random() * (width - 100)) + 'px';
    puff.style.top = 100 + Math.round(Math.random() * (height - 200)) + 'px';

    return puff;
  }
}
