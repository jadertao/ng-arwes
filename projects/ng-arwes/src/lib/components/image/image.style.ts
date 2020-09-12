import { rgba } from 'polished';
import { ArwesImageInput } from './image.component';
import { ComponentClassFn, ComponentInstanceFn } from 'ng-arwes/tools/style';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';

interface NgArwesImageStyleParams {
  theme: NgArwesTheme;
  input: ArwesImageInput;
}


export const NgArwesImageStyle = {
  root: {
    position: 'relative',
    display: 'block',
    margin: ({ input, theme }: NgArwesImageStyleParams) => [0, 0, theme.margin],
    width: '100%',
    minHeight: 1,
    verticalAlign: 'middle',

  },
  holder: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    transition: ({ input, theme }: NgArwesImageStyleParams) => `all ${theme.animTime}ms ease-out`,
    minHeight: 200
  },
  img: {
    display: 'block',
    border: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
    height: 'auto',
    verticalAlign: 'top',
    boxShadow: 'none',
    transition: ({ input, theme }: NgArwesImageStyleParams) => `all ${theme.animTime}ms ease-in`,
    opacity: 0
  },
  error: {
    display: 'block',
    margin: 'auto',
    textAlign: 'center',
    color: ({ input, theme }: NgArwesImageStyleParams) => theme.color.alert.base
  },
  separator: {
    position: 'absolute',
    top: 'auto',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'block',
    width: '100%',
    borderStyle: 'solid',
    borderColor: ({ input, theme }: NgArwesImageStyleParams) =>
      rgba(theme.color[input.layer].dark, theme.alpha / 2),
    borderWidth: '0 0 1px',
    transition: ({ input, theme }: NgArwesImageStyleParams) => `all ${theme.animTime}ms ease-in`
  },
  children: {
    display: 'block',
    margin: 0,
    padding: ({ input, theme }: NgArwesImageStyleParams) => theme.padding / 2,
    textAlign: 'center',
    backgroundColor: ({ input, theme }: NgArwesImageStyleParams) => theme.background[input.layer].level1,
    color: ({ input, theme }: NgArwesImageStyleParams) => theme.color[input.layer].dark,
    transition: ({ input, theme }: NgArwesImageStyleParams) => `opacity ${theme.animTime}ms ease-in`,
    opacity: 1
  },

  ready: {
    '& $holder': {
      minHeight: 'auto'
    },
    '& $img': {
      opacity: 1
    }
  },

};

export const genImageStyle = () => { };

export const genImageClassStyle: ComponentClassFn = ({ name, theme }) => `
.${name} {
  display: block;
  position: relative;
  margin: 0 0 ${theme.margin}px;
  width: 100%;
  min-height: 1px;
  vertical-align: middle;
}

.${name} .${name}-holder {
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all ${theme.animTime}ms ease-out;
  min-height: 200px;
}

.${name} .${name}-img {
  display: block;
  border: none;
  margin: 0;
  padding: 0;
  height: auto;
  width: 100%;
  vertical-align: top;
  box-shadow: none;
  transition: all ${theme.animTime}ms ease-in;
  opacity: 0;
}

.${name} .${name}-error {
  display: block;
  margin: auto;
  text-align: center;
  color: ${theme.color.alert.base};
}

.${name} .${name}-separator {
  position: absolute;
  top: auto;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  width: 100%;
  border-style: solid;
  border-width: 0 0 1px;
  transition: all ${theme.animTime}ms ease-in;
}

.${name} .${name}-children {
  display: block;
  margin: 0;
  padding: ${theme.padding / 2}px;
  text-align: center;
  transition: opacity ${theme.animTime}ms ease-in;
  opacity: 1;
}

.${name}.ready .${name}-holder {
  min-height: auto;
}
.${name}.ready .${name}-img {
  opacity: 1;
}
`;

export const genImageInstanceStyle: ComponentInstanceFn<ArwesImageInput> = ({ name, id, theme, input }) => `
.${name}.${id} .${name}-separator {
  border-color: ${rgba(theme.color[input.layer].dark, theme.alpha / 2)};
}

.${name}.${id} .${name}-children {
  background-color: ${theme.background[input.layer].level1};
  color: ${theme.color[input.layer].dark};
}
`;
