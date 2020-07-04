import { Injectable } from '@angular/core';
import { ThemeService } from '../theme/theme.service';
import { fromEvent, Subject } from 'rxjs';
import { isNode } from 'ng-arwes/tools/isNode';


enum ResponsiveStatusType {
  small = 'small',
  medium = 'medium',
  large = 'large',
  xlarge = 'xlarge',
}

type ResponsiveStatusItem<T extends ResponsiveStatusType> = { [index in T]: true } & { status: T };

type ResponsiveStatus = ResponsiveStatusItem<ResponsiveStatusType.small>;

const type: ResponsiveStatusItem<ResponsiveStatusType.small> = {
  small: true,
  status: ResponsiveStatusType.small
};

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  change: Subject<any>;

  constructor(
    private theme: ThemeService
  ) {
    this.change = new Subject<any>();
    if (!isNode) {
      fromEvent(window, 'resize', { capture: false }).subscribe(v => console.log(v));
    }
  }

  status$() {

  }
}
