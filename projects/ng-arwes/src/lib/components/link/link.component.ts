import { Subscription } from 'rxjs';
import { DEFAULT_THEME } from './../../tools/theme';
import { NgArwesTheme } from './../../types/theme.interfaces';
import { ThemeService } from './../../services/theme.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'arwes-link',
  styleUrls: ['./link.component.less'],
  template: `
    <a
      class="arwes-link"
      (mouseover)="hover=true"
      (mouseleave)="hover=false"
      [href]="href"
      [target]="target"
      [style.color]="hover ? theme.color.control.light : theme.color.control.base"
      [style.text-shadow]="'0px 0px ' + theme.shadowLength + 'px ' + (theme.color.control.base | rgba: theme.alpha) | safestyle"
      [style.transition]="'color ' + theme.animTime + 'ms ease-out'"
      [target]="'0 0 ' + theme.shadowLength + 'px ' + (theme.color.control.base | rgba: theme.alpha)"
    >
      <ng-content></ng-content>
    </a>
  `
})
export class LinkComponent implements OnInit, OnDestroy {
  public theme: NgArwesTheme = DEFAULT_THEME;
  private themeSub: Subscription;

  @Input()
  public href: string;

  @Input()
  public target: string;

  get textShadow(): string {
    return `0 0 ${this.theme.shadowLength}px`;
  }

  constructor(public themeSvc: ThemeService) { }

  ngOnInit(): void {
    this.themeSub = this.themeSvc.theme$.subscribe(theme => {
      this.theme = theme;
    });
  }
  /* .arwes-link {
  // color: theme.color.control.base,
  // textShadow:
  //   `0 0 ${ theme.shadowLength }px` +
  //   rgba(theme.color.control.base, theme.alpha),
  // transition: `color ${ theme.animTime }ms ease - out`,
  text-decoration: none;
  cursor: pointer;

  // '&:hover': {
  //   color: theme.color.control.light
  // }
} */

  ngOnDestroy(): void {
    this.themeSub.unsubscribe();
  }
}
