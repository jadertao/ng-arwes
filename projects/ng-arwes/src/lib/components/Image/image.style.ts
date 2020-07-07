import { ArwesImageInput } from './image.component';
import { ComponentClassFn, ComponentInstanceFn } from 'ng-arwes/tools/style';


export const genImageClassStyle: ComponentClassFn = ({ name, theme }) => `
.${name} {
  display: block;
  position: relative;
  margin: 0 0 ${theme.margin}px;
  width: 100%;
  min-height: 1px;
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

export const genImageInstanceStyle: ComponentInstanceFn<ArwesImageInput> = ({ name, id, theme, input }) => `
.${name}.${id} .${name}-body {
}
`;
