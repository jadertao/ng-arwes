import { FooLibModule } from './../../projects/foo-lib/src/lib/foo-lib.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FooLibModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
