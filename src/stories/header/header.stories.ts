import note from './header.note.md';

export default {
  title: 'Header',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
<na-header animate>arwes header component</na-header>
<na-header animate>arwes header component</na-header>
<na-header animate>arwes header component</na-header>
  `
});
