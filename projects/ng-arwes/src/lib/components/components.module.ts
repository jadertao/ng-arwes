import { LineComponent } from './line/line.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [LineComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LineComponent,
  ]
})
export class ComponentsModule { }
