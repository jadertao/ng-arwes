import { addDecorator, moduleMetadata } from '@storybook/angular';
import { NgArwesModule } from 'ng-arwes';
import note from './code.note.md';
import { CodeComponent } from 'ng-arwes/components/code/code.component';

export default {
  title: 'Code',
  component: CodeComponent,
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
<div style="background-color: #021114; padding: 20px 20px">
  <pre arwes-code show language="javascript">
const foo = 'hello';
console.log(foo + ' world');
  </pre>

  <pre arwes-code *ngIf="false" language="javascript">
const foo = 'hello';
console.log(foo + ' world');
  </pre>


  <pre arwes-code animate language="javascript">
const foo = 'hello';
console.log(foo + ' world');
  </pre>
</div>
`,
});