import { Injectable } from '@angular/core';
import { ThemeService } from '../theme/theme.service';
import { fromEvent, Subject, Observable, of } from 'rxjs';
import { isNode } from 'ng-arwes/tools/isNode';
import { getDimensions } from 'ng-arwes/tools/dimension';
import { map } from 'rxjs/operators';


export enum ResponsiveStatusType {
  small = 'small',
  medium = 'medium',
  large = 'large',
  xlarge = 'xlarge',
}

type ResponsiveStatusItem<T extends ResponsiveStatusType> = { [index in T]: true } & { status: T };

type ResponsiveStatus =
  | ResponsiveStatusItem<ResponsiveStatusType.small>
  | ResponsiveStatusItem<ResponsiveStatusType.medium>
  | ResponsiveStatusItem<ResponsiveStatusType.large>
  | ResponsiveStatusItem<ResponsiveStatusType.xlarge>;

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  change: Subject<any>;

  constructor(
    private themeService: ThemeService
  ) {
    this.change = new Subject<any>();
    if (!isNode) {
      fromEvent(window, 'resize', { capture: false }).subscribe(v => console.log(v));
    }
  }
  get$(): Observable<ResponsiveStatus> {
    return this.themeService.theme$.pipe(
      map(theme => {
        // return { status: ResponsiveStatusType.large, large: true };
        const { width } = getDimensions();
        const { small, medium, large } = theme.responsive;
        if (width <= small) {
          return { status: ResponsiveStatusType.small, small: true };
        } else if (width <= medium) {
          return { status: ResponsiveStatusType.medium, medium: true };
        } else if (width <= large) {
          return { status: ResponsiveStatusType.large, large: true };
        }
        return { status: ResponsiveStatusType.xlarge, xlarge: true };
      })
    );
  }
  status$() {

  }
}
