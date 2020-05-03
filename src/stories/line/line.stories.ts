import note from './line.note.md';

export default {
  title: 'Line',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
<arwes-line animate></arwes-line>
<arwes-line animate layer="success"></arwes-line>
<arwes-line animate layer="disabled"></arwes-line>
<arwes-line animate layer="alert"></arwes-line>
  `
});
