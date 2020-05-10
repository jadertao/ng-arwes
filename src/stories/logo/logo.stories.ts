import note from './logo.note.md';

export default {
  title: 'Logo',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
  <arwes-logo> Put your content here Put your content here</arwes-logo>
  <arwes-logo> Put your content here Put your content here</arwes-logo>
  <arwes-logo> Put your content here Put your content here</arwes-logo>
`,
});
