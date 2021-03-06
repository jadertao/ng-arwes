import { AppearComponent } from './components/appear/appear.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { HeaderComponent } from './components/header/header.component';
import { WordsComponent } from './components/words/words.component';
import { Howl } from 'howler';
import { NG_ARWES_SOUND_TOKEN, NgArwesSound, NgArwesSoundOptions } from './tools/sound';
import { FooterComponent } from './components/footer/footer.component';
import { HeadingComponent } from './components/heading/heading.component';
import { BlockquoteComponent } from './components/blockquote/blockquote.component';
import { SafeStylePipe } from './pipes/safe.style.pipe';
import { RgbaPipe } from './pipes/rgba.pipe';
import { LinkComponent } from './components/link/link.component';
import { NG_ARWES_THEME_TOKEN, DEFAULT_THEME } from './tools/theme';
import { NgArwesTheme } from './types/theme.interfaces';
import { CommonModule } from '@angular/common';
import { ThemeService } from './services/theme/theme.service';
import { LineComponent } from './components/line/line.component';
import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mergeDeep } from './tools/merge';
import { DeepPartial } from './types';
import { CodeComponent } from './components/code/code.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { FrameComponent } from './components/frame/frame.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LogoComponent } from './components/logo/logo.component';
import { ListComponent } from './components/list/list.component';
import { PuffComponent } from './components/puff/puff.component';
import { ButtonComponent } from './components/button/button.component';
import { ImageComponent } from './components/image/image.component';
import jss from 'jss';
import preset from 'jss-preset-default';
import defaultUnit from 'jss-plugin-default-unit';
import jssNested from 'jss-plugin-nested';
import jssFunction from 'jss-plugin-rule-value-function';

jss.setup(preset());
jss.use(defaultUnit());
jss.use(jssNested());
jss.use(jssFunction());

export interface NgArwesModuleOptions {
  theme?: DeepPartial<NgArwesTheme>;
  sound?: Partial<NgArwesSoundOptions>;
}

const providers: Provider[] = [
  ThemeService,
];

const components = [
  LineComponent,
  LinkComponent,
  BlockquoteComponent,
  HeadingComponent,
  FooterComponent,
  WordsComponent,
  HeaderComponent,
  HighlightComponent,
  AppearComponent,
  CodeComponent,
  ParagraphComponent,
  FrameComponent,
  LoadingComponent,
  LogoComponent,
  ListComponent,
  PuffComponent,
  ButtonComponent,
  ImageComponent,
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
    forRootProviders.push({
      provide: NG_ARWES_SOUND_TOKEN,
      useValue: Object.keys(options.sound || {})
        .reduce((result, type: keyof NgArwesSoundOptions) => {
          result[type] = new Howl({ src: options.sound[type] });
          return result;
        }, {} as NgArwesSound),
    });
    return {
      ngModule: NgArwesModule,
      providers: forRootProviders,
    };
  }
}
