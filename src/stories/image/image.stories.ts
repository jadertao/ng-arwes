import note from './image.note.md';

export default {
  title: 'Image',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
<arwes-image animate resources='images/wallpaper.jpg'></arwes-image>
  `
});
