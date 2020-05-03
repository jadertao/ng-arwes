import note from './link.note.md';

export default {
  title: 'Link',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `<a arwes-link href="https://www.angular.io" target="_blank"> Put your content here </a>`,
});
