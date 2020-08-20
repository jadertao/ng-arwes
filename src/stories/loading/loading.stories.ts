import note from './loading.note.md';

export default {
  title: 'Loading',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
  <na-loading animate></na-loading>
  <na-loading animate small></na-loading>
  <div style="position: relative; width: 200px; height: 200px;">
    <na-loading animate full></na-loading>
  </div>
  `,
});
