import note from './footer.note.md';

export default {
  title: 'Footer',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
<arwes-footer animate>arwes footer component</arwes-footer>
<arwes-footer animate>arwes footer component</arwes-footer>
<arwes-footer animate [show]="false">arwes footer component</arwes-footer>
<arwes-footer animate>arwes footer component</arwes-footer>
  `
});
