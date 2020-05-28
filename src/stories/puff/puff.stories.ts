import note from './puff.note.md';

export default {
  title: 'Puff',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
  <arwes-puff>
    <div style="width: 100%; height: 500px"></div>
  </arwes-puff>
`,
});
