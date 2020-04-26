import { rgba, lighten } from 'polished';
import { NgArwesTheme, NgArwesThemeColor } from 'ng-arwes/types/theme.interfaces';
import { FrameInput } from './frame.component';

const cornerLength = (corners: number) => {
  switch (corners) {
    case 1:
      return 8;
    case 2:
      return 16;
    case 3:
      return 16;
    case 4:
      return 24;
    case 5:
      return 24;
    default:
      return 32;
  }
};

const cornerWidth = (corners: number) => {
  switch (corners) {
    case 1:
      return 1;
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
      return 2;
    case 6:
      return 3;
    default:
      return 3;
  }
};

const getColor = (theme: NgArwesTheme, input: FrameInput, level: keyof NgArwesThemeColor) => {
  return theme.color[input.disabled ? 'disabled' : input.layer][level];
};

const getBg = (theme: NgArwesTheme, input: FrameInput) =>
  theme.background[input.disabled ? 'disabled' : input.layer]['level' + input.level];

export const genFrameStyle = (theme: NgArwesTheme, input: FrameInput) => {
  return `
.arwes-frame {
  display: block;
  position: relative;
  padding: 1px;
}

.arwes-frame:hover .arwes-frame-border {
  border-color: ${getColor(theme, input, 'base')};
  box-shadow: 0 0 ${theme.shadowLength}px ${rgba(getColor(theme, input, 'base'), theme.alpha)};
}

.arwes-frame:hover .arwes-frame-corner {
  border-color: ${getColor(theme, input, 'light')};
  box-shadow: 0 0 ${theme.shadowLength}px -${theme.shadowLength / 2}px ${rgba(getColor(theme, input, 'light'), theme.alpha)};
}

.arwes-frame .arwes-frame-box {
  z-index: 3;
  position: relative;
  overflow: hidden;
  display: block;
  transition: background-color ${theme.animTime}ms ease-in;
  background-color: ${
    input.noBackground
      ? 'transparent'
      : input.active
        ? rgba(lighten(theme.accent, getBg(theme, input)), theme.alpha)
        : rgba(getBg(theme, input), theme.alpha)
    }
}

.arwes-frame .arwes-frame-children {
  display: block;
}

.arwes-frame .arwes-frame-border {
  z-index: 1;
  position: absolute;
  border-style: solid;
  transition: all ${theme.animTime}ms ease-in;
  border-color: ${getColor(theme, input, 'dark')};
  box-shadow: 0 0 ${theme.shadowLength}px ${rgba(getColor(theme, input, 'dark'), theme.alpha)};
  opacity: 1;
}

.arwes-frame .arwes-frame-border-left {
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  border-width: 0 0 0 1px;
  height: 100%;
}

.arwes-frame .arwes-frame-border-right {
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  border-width: 0 0 0 1px;
  height: 100%;
}

.arwes-frame .arwes-frame-border-top {
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  border-width: 1px 0 0 0;
  width: 100%;
}

.arwes-frame .arwes-frame-border-bottom {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  border-width: 1px 0 0 0;
  width: 100%;
}

.arwes-frame .arwes-frame-corner {
  z-index: 2;
  position: absolute;
  width: ${cornerLength(input.corners)}px;
  height: ${cornerLength(input.corners)}px;
  transition: all ${theme.animTime}ms ease-in;
  border-style: solid;
  border-color: ${getColor(theme, input, 'base')};
  box-shadow: 0 0 ${theme.shadowLength}px -${theme.shadowLength / 2}px ${rgba(getColor(theme, input, 'base'), theme.alpha)};
  opacity: 1
}

.arwes-frame .arwes-frame-cornerLT {
  left: -${cornerWidth(input.corners)}px;
  top: -${cornerWidth(input.corners)}px;
  border-width: ${cornerWidth(input.corners)}px 0 0 ${cornerWidth(input.corners)}px;
}

.arwes-frame .arwes-frame-cornerLB {
  left: -${cornerWidth(input.corners)}px;
  bottom: -${cornerWidth(input.corners)}px;
  border-width: 0 0 ${cornerWidth(input.corners)}px ${cornerWidth(input.corners)}px;
}

.arwes-frame .arwes-frame-cornerRT {
  right: -${cornerWidth(input.corners)}px;
  top: -${cornerWidth(input.corners)}px;
  border-width: ${cornerWidth(input.corners)}px ${cornerWidth(input.corners)}px 0 0;
}

.arwes-frame .arwes-frame-cornerRB {
  right: -${cornerWidth(input.corners)}px;
  bottom: -${cornerWidth(input.corners)}px;
  border-width: 0 ${cornerWidth(input.corners)}px ${cornerWidth(input.corners)}px 0;
}
  `;
};
