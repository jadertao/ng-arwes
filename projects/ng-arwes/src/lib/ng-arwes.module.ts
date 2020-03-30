import { SafeStylePipe } from './pipes/safe.style.pipe';
import { RgbaPipe } from './pipes/rgba.pipe';
import { LinkComponent } from './components/link/link.component';
import { NG_ARWES_THEME_TOKEN, DEFAULT_THEME } from './tools/theme';
import { NgArwesTheme } from './types/theme.interfaces';
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
    LinkComponent,
    RgbaPipe,
    SafeStylePipe,
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
    LinkComponent,
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
