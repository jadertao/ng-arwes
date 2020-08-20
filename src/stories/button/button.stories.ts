import note from './button.note.md';

export default {
  title: 'Button',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
<na-button animate disabled>
  <div style="padding: 20px 40px;border: 1px solid #eee; display: inline-block;">Cyberpunk</div>
</na-button>
<na-button animate>
  <div style="padding: 20px 40px;border: 1px solid #eee; display: inline-block;">Cyberpunk</div>
</na-button>
<na-button animate layer="success">
  <div style="padding: 20px 40px;border: 1px solid #eee; display: inline-block;">Cyberpunk</div>
</na-button>
<na-button animate layer="alert">
  <div style="padding: 20px 40px;border: 1px solid #eee; display: inline-block;">Cyberpunk</div>
</na-button>
  `
});
