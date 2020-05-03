import note from './code.note.md';

export default {
  title: 'Code',
  parameters: {
    notes: { note },
  },
};

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
