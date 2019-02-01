import { NgModule } from '@angular/core';
import { FooLibComponent } from './foo-lib.component';
import { FooComponent } from './foo/foo.component';

@NgModule({
  declarations: [FooLibComponent, FooComponent],
  imports: [
  ],
  exports: [FooLibComponent]
})
export class FooLibModule { }
