import { NgArwesModule } from 'ng-arwes';
import { addDecorator, moduleMetadata } from '@storybook/angular';

addDecorator(moduleMetadata({
  imports: [NgArwesModule.forRoot({
    sound: {
      click: 'sounds/click.mp3',
      deploy: 'sounds/deploy.mp3',
      typing: 'sounds/typing.mp3',
      warning: 'sounds/warning.mp3',
      ask: 'sounds/ask.mp3',
      error: 'sounds/error.mp3',
      information: 'sounds/information.mp3',
    }
  })],
  schemas: [],
  declarations: [],
  providers: [],
}));
