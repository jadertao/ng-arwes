import note from './paragraph.note.md';

export default {
  title: 'Paragraph',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
  <p arwes-paragraph> Put your content here Put your content here</p>
  <p arwes-paragraph> Put your content here Put your content here</p>
  <p arwes-paragraph> Put your content here Put your content here</p>
`,
});
