import { rgba, lighten } from 'polished';
import { NgArwesTheme, NgArwesThemeColor } from 'ng-arwes/types/theme.interfaces';
import { ArwesButtonInput } from './button.component';


export const genButtonStyle = (theme: NgArwesTheme, input: ArwesButtonInput) => {
  return `
.arwes-button {
  display: inline-block;
  position: relative;
  line-height: 1;
  vertical-align: middle;
}

.arwes-button .arwes-button-body {
  position: relative;
  z-index: 2;
  display: inline-block;
  margin: 0;
  border: none;
  padding: ${theme.padding / 2}px, ${theme.padding};
  background: transparent;
  color: ${theme.color[input.disabled ? 'disabled' : input.layer].base};
  font-size: ${theme.typography.fontSize * 0.75};
  line-height: 1;
  vertical-align: middle;

  transition: all ${theme.animTime}ms ease out;
  user-select: none;
  outline: none;
  cursor: ${input.disabled ? 'auto' : 'pointer'};
}

.arwes-button .arwes-button-body:focus {
  outline: none;
}

.arwes-button .arwes-button-body::-noz-focus-inner {
  border: none;
}
  `;
};
