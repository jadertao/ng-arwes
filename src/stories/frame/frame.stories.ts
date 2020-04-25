import { addDecorator, moduleMetadata } from '@storybook/angular';
import { NgArwesModule } from 'ng-arwes';
import note from './frame.note.md';
import { FrameComponent } from 'ng-arwes/components/frame/frame.component';

export default {
  title: 'Frame',
  component: FrameComponent,
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
<div arwes-frame show animate [level]=3 [corners]=4 layer="success" style="padding:20px 40px; font-size:32px">
  Cyberpunk
</div>

`,
});
