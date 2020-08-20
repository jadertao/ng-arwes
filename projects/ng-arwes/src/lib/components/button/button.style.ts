import { ArwesButtonInput } from './button.component';
import { ComponentClassFn, ComponentInstanceFn } from 'ng-arwes/tools/style';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';

interface NgArwesButtonStyleParams {
  theme: NgArwesTheme;
  input: ArwesButtonInput;
}

export const NgArwesButtonStyle = {

  root: {
    display: 'inline-block',
    position: 'relative',
    lineHeight: 1,
    verticalAlign: 'middle'
  },
  button: {
    position: 'relative',
    zIndex: 2,
    display: 'inline-block',
    margin: 0,
    border: 'none',
    padding: ({ theme }) => [theme.padding / 2, theme.padding],
    background: 'transparent',

    color: ({ input, theme }: NgArwesButtonStyleParams) =>
      theme.color[input.disabled ? 'disabled' : input.layer].base,
    fontSize: ({ theme }: NgArwesButtonStyleParams) => theme.typography.fontSize * 0.75,
    lineHeight: 1,
    verticalAlign: 'middle',

    transition: ({ theme }: NgArwesButtonStyleParams) => `all ${theme.animTime}ms ease-out`,
    userSelect: 'none',
    outline: 'none',
    cursor: ({ input, theme }: NgArwesButtonStyleParams) => (input.disabled ? 'auto' : 'pointer'),

    '&:focus': {
      outline: 'none'
    },

    '&::-moz-focus-inner': {
      border: 'none'
    },

    '& .mdi, & .icon': {
      lineHeight: 0,
      fontSize: '140%',
      verticalAlign: 'middle'
    }
  }
};

export const genButtonClassStyle: ComponentClassFn = ({ name, theme }) => `
.${name} {
  display: inline-block;
  position: relative;
  line-height: 1;
  vertical-align: middle;
}

.${name} .${name}-body {
  position: relative;
  z-index: 2;
  display: inline-block;
  margin: 0;
  border: none;
  padding: ${theme.padding / 2}px ${theme.padding}px;
  background: transparent;
  font-size: ${theme.typography.fontSize * 0.75}px;
  line-height: 1;
  vertical-align: middle;

  transition: all ${theme.animTime}ms ease-out;
  user-select: none;
  outline: none;
}

.${name} .${name}-body:focus {
  outline: none;
}

.${name} .${name}-body::-noz-focus-inner {
  border: none;
}
`;

export const genButtonInstanceStyle: ComponentInstanceFn<ArwesButtonInput> = ({ name, id, theme, input }) => `
.${name}.${id} .${name}-body {
  color: ${theme.color[input.disabled ? 'disabled' : input.layer].base};
  cursor: ${input.disabled ? 'auto' : 'pointer'};
}
`;
