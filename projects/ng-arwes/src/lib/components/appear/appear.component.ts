import { appearMotion } from './appear.animation';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  HostBinding,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ThemeService } from './../../services/public-api';
import { NgArwesTheme } from './../../types/theme.interfaces';
import { InputBoolean } from './../../tools';

const AppearSelector = '[arwes-appear]';

@Component({
  selector: AppearSelector,
  animations: [appearMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./appear.component.less'],
  template: `
    <span
      class="arwes-appear"
      *ngIf="show"
      [@.disabled]="!animate"
      [@appearMotion]="{
        value: null,
        params: {
          animTime: theme.animTime
        }
      }"
    >
      <ng-content></ng-content>
    </span>
  `,
})
export class AppearComponent implements OnInit, OnDestroy {
  public theme: NgArwesTheme | null = null;
  private destroy$ = new Subject<void>();

  @Input()
  @InputBoolean()
  animate = false;

  @Input()
  @InputBoolean()
  show = true;

  constructor(private themeSvc: ThemeService) {
    this.themeSvc.theme$.pipe(takeUntil(this.destroy$)).subscribe((theme) => {
      this.theme = theme;
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
