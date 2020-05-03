import note from './header.note.md';

export default {
  title: 'Header',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
<arwes-header animate>arwes header component</arwes-header>
<arwes-header animate>arwes header component</arwes-header>
<arwes-header animate>arwes header component</arwes-header>
  `
});
