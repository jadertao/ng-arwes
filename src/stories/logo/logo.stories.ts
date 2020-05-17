import note from './logo.note.md';

export default {
  title: 'Logo',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
  <div style="background-color: black; height: 100%">
    <arwes-logo [width]="300" [height]="300"></arwes-logo>
    <arwes-logo animate [width]="300" [height]="300"></arwes-logo>
  </div>
`,
});
