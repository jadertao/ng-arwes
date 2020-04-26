import { NgArwesModule } from '../../../projects/ng-arwes/src/lib/ng-arwes.module';
import note from './paragraph.note.md';
import { addDecorator, moduleMetadata } from '@storybook/angular';

export default {
  title: 'Paragraph',
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
  template: `
  <p arwes-paragraph> Put your content here Put your content here</p>
  <p arwes-paragraph> Put your content here Put your content here</p>
  <p arwes-paragraph> Put your content here Put your content here</p>
`,
});
