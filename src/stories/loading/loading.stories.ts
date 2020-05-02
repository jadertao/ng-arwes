import note from './loading.note.md';

export default {
  title: 'Loading',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
  <arwes-loading animate></arwes-loading>
  <arwes-loading animate small></arwes-loading>
  <div style=" position: relative; width: 200px; height: 200px; ">
    <arwes-loading animate full></arwes-loading>
  </div>
  `,
});
