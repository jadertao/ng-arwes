import { NgArwesTheme } from './../../types/theme.interfaces';
import { takeUntil } from 'rxjs/operators';
import { NG_ARWES_SOUND_TOKEN, NgArwesSound } from './../../tools/sound';
import { ThemeService } from './../../services/theme.service';
import { NgArwesLayerStatusEnum } from './../../types/theme.enums';
import { Component, OnInit, Input, Inject, OnDestroy, ContentChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { InputBoolean } from './../../tools';

@Component({
  selector: 'arwes-words',
  styleUrls: ['./words.component.less'],
  template: `
<span
  class="arwes-words"
  [@.disabled]="!animate"
>
  <span class="arwes-words-children">
    <ng-content></ng-content>
  </span>
  <span class="arwes-words-text">
    {{ text }}
    <span class="arwes-words-blink" [innerHTML]='blinkText'></span>
  </span>
</span>
`,
})
export class WordsComponent implements OnInit, OnDestroy {

  public _text = '';
  public get text() {
    return this._text;
  }
  public theme: NgArwesTheme | null = null;
  private destroy$ = new Subject<void>();

  @Input()
  blinkText = '&#9611;';
  @Input()
  layer = NgArwesLayerStatusEnum.Primary;
  @Input() @InputBoolean()
  show = true;
  @Input() @InputBoolean()
  animate = false;

  constructor(
    public themeSvc: ThemeService,
    @Inject(NG_ARWES_SOUND_TOKEN) private sounds: NgArwesSound,
  ) {
    this.themeSvc.theme$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(theme => {
        this.theme = theme;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startAnimation(isIn: boolean) {
    const { theme, animate, sounds } = this;
  }
}
