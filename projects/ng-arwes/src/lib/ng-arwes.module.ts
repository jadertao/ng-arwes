import { BlockquoteComponent } from './components/blockquote/blockquote.component';
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
  theme?: DeepPartial<NgArwesTheme>;
}

const providers: Provider[] = [
  ThemeService,
];

const components = [
  LineComponent,
  LinkComponent,
  BlockquoteComponent,
];

@NgModule({
  declarations: [
    ...components,
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
    ...components,
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
