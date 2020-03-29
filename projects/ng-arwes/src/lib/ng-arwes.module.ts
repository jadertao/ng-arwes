import { NG_ARWES_THEME_TOKEN, DEFAULT_THEME } from './tools/theme';
import { NgArwesTheme } from './types/theme';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme.service';
import { LineComponent } from './components/line/line.component';
import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mergeDeep } from './tools/merge';


export interface NgArwesModuleOptions {
  theme?: Partial<NgArwesTheme>;
}

const providers: Provider[] = [
  ThemeService,
];

@NgModule({
  declarations: [
    LineComponent,
  ],
  providers: [
    ...providers,
    {
      provide: NG_ARWES_THEME_TOKEN,
      useValue: DEFAULT_THEME,
    },
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
  ],
  exports: [
    LineComponent,
  ]
})
export class NgArwesModule {
  static forRoot(options: NgArwesModuleOptions): ModuleWithProviders {
    const forRootProviders = [...providers];
    forRootProviders.push({
      provide: NG_ARWES_THEME_TOKEN,
      useValue: options.theme ? mergeDeep(DEFAULT_THEME, options.theme) : DEFAULT_THEME,
    });
    return {
      ngModule: NgArwesModule,
      providers
    };
  }
}
