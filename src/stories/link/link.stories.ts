import { NgArwesModule } from '../../../projects/ng-arwes/src/lib/ng-arwes.module';
import note from './link.note.md';
import { addDecorator, moduleMetadata } from '@storybook/angular';

export default {
  title: 'Link',
  parameters: {
    notes: { note },
  },
};

addDecorator(moduleMetadata({
  imports: [NgArwesModule],
  schemas: [],
  declarations: [],
  providers: [],
}));

export const Text = () => ({
  template: `<a arwes-link href="https://www.angular.io" target="_blank"> Put your content here </a>`,
});
