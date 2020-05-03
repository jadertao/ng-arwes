import note from './highlight.note.md';

export default {
  title: 'Highlight',
  parameters: {
    notes: { note },
  },
};

export const Text = () => ({
  template: `
<div arwes-highlight animate style="display: inline-block;">
  <div style="padding: 20px 40px;border: 1px solid #eee; display: inline-block;">Cyberpunk</div>
</div>
<div arwes-highlight animate layer="success" style="display: inline-block;">
  <div style="padding: 20px 40px;border: 1px solid #eee; display: inline-block;">Cyberpunk</div>
</div>
<div arwes-highlight animate layer="disabled" style="display: inline-block;">
  <div style="padding: 20px 40px;border: 1px solid #eee; display: inline-block;">Cyberpunk</div>
</div>
<div arwes-highlight animate layer="alert" style="display: inline-block;">
  <div style="padding: 20px 40px;border: 1px solid #eee; display: inline-block;">Cyberpunk</div>
</div>
  `
});
