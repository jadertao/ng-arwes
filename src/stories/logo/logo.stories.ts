import note from './logo.note.md';

export default {
  title: 'Logo',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
  <p arwes-logo> Put your content here Put your content here</p>
  <p arwes-logo> Put your content here Put your content here</p>
  <p arwes-logo> Put your content here Put your content here</p>
`,
});
