import { LineComponent } from './../../projects/ng-arwes/src/lib/components/line/line.component';
import { ComponentsModule } from './../../projects/ng-arwes/src/lib/components/components.module';

import { addDecorator, moduleMetadata } from '@storybook/angular';
import { Button } from '@storybook/angular/demo';

export default {
  title: 'Button2',
  component: Button,
};

addDecorator(moduleMetadata({
  imports: [ComponentsModule],
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
