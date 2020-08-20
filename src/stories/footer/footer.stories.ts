import note from './footer.note.md';

export default {
  title: 'Footer',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
<na-footer animate>arwes footer component</na-footer>
<na-footer animate>arwes footer component</na-footer>
<na-footer animate [show]="false">arwes footer component</na-footer>
<na-footer animate>arwes footer component</na-footer>
  `
});
