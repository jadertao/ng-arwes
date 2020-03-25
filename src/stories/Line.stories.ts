import { LineComponent } from './../../projects/ng-arwes/src/lib/components/line/line.component';
import { NgArwesModule } from './../../projects/ng-arwes/src/lib/ng-arwes.module';

import { addDecorator, moduleMetadata } from '@storybook/angular';
import { Button } from '@storybook/angular/demo';

export default {
  title: 'Button2',
  component: Button,
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
