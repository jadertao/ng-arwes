import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { LineComponent } from './components/line/line.component';
import { NgModule } from '@angular/core';



@NgModule({
  declarations: [
    LineComponent,
  ],
  providers: [
    ThemeService,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LineComponent,
  ]
})
export class NgArwesModule {

}
