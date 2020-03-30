import { LineComponent } from '../../../projects/ng-arwes/src/lib/components/line/line.component';
import { NgArwesModule } from '../../../projects/ng-arwes/src/lib/ng-arwes.module';
import note from './line.note.md';
import { addDecorator, moduleMetadata } from '@storybook/angular';

export default {
  title: 'Line',
  component: LineComponent,
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
  component: LineComponent,
  props: {
    text: 'Hello Button',
  },
});
