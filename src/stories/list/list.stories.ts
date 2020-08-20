import note from './list.note.md';

export default {
  title: 'List',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
  <ul na-list>
    <li>list item</li>
    <li>list item</li>
    <li>list item</li>
  </ul>
  <ol na-list>
    <li>list item</li>
    <li>list item</li>
    <li>list item</li>
  </ol>
  <dl na-list>
    <dt>list item</dt>
    <dd>list item</dd>
    <dt>list item</dt>
    <dd>list item</dd>
  </dl>
  `,
});
