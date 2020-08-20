import note from './blockquote.note.md';

export default {
  title: 'Blockquote',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
<blockquote na-blockquote layer="success"> Put your content here </blockquote>
<blockquote na-blockquote layer="primary"> Put your content here </blockquote>
<blockquote na-blockquote layer="disabled"> Put your content here </blockquote>
<blockquote na-blockquote layer="alert"> Put your content here </blockquote>
`,
});
