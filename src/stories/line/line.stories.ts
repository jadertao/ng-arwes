import note from './line.note.md';

export default {
  title: 'Line',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
<na-line animate></na-line>
<na-line animate layer="success"></na-line>
<na-line animate layer="disabled"></na-line>
<na-line animate layer="alert"></na-line>
  `
});
