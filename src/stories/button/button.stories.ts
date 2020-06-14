import note from './button.note.md';

export default {
  title: 'Button',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
<arwes-button animate disabled>
  <div style="padding: 20px 40px;border: 1px solid #eee; display: inline-block;">Cyberpunk</div>
</arwes-button>
<arwes-button animate>
  <div style="padding: 20px 40px;border: 1px solid #eee; display: inline-block;">Cyberpunk</div>
</arwes-button>
<arwes-button animate layer="success">
  <div style="padding: 20px 40px;border: 1px solid #eee; display: inline-block;">Cyberpunk</div>
</arwes-button>
<arwes-button animate layer="alert">
  <div style="padding: 20px 40px;border: 1px solid #eee; display: inline-block;">Cyberpunk</div>
</arwes-button>
  `
});
