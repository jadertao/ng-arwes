import { FooterComponent } from 'ng-arwes/components/footer/footer.component';
import { NgArwesModule } from 'ng-arwes';
import note from './footer.note.md';
import { addDecorator, moduleMetadata } from '@storybook/angular';

export default {
  title: 'Footer',
  component: FooterComponent,
  parameters: {
    notes: { note },
  },
};

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

export const Text = () => ({
  template: `
<footer arwes-footer animate>arwes footer component</footer>
<footer arwes-footer animate>arwes footer component</footer>
<footer arwes-footer animate>arwes footer component</footer>
  `
});
