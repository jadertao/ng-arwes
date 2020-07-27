import note from './image.note.md';

export default {
  title: 'Image',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
  <div style="margin: 0 auto; padding: 20px; max-width: 600px">
    <arwes-image animate resources='images/wallpaper.jpg'>
      The vast universe around us
    </arwes-image>
  </div>
  `
});
