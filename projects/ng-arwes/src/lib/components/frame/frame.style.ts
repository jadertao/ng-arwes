import { rgba, lighten } from 'polished';
import { NgArwesTheme, NgArwesThemeColor } from 'ng-arwes/types/theme.interfaces';
import { ArwesFrameInput } from './frame.component';
import { ComponentInstanceFn, ComponentClassFn } from 'ng-arwes/tools/style';

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

const getColor = (theme: NgArwesTheme, input: ArwesFrameInput, level: keyof NgArwesThemeColor) => {
  return theme.color[input.disabled ? 'disabled' : input.layer][level];
};

const getBg = (theme: NgArwesTheme, input: ArwesFrameInput) =>
  theme.background[input.disabled ? 'disabled' : input.layer]['level' + input.level];

export const genFrameStyle = (theme: NgArwesTheme) => ({
  root: {
    display: 'block',
    position: 'relative',
    padding: '1px',

    '&$exiting, &$exited': {
      '& $borderLeft, & $borderRight': {
        height: '0%'
      },
      '& $borderTop, & $borderBottom': {
        width: '0%'
      },
      '& $corner': {
        width: 0,
        height: 0,
        opacity: 0
      },
      '& $box': {
        backgroundColor: 'transparent'
      }
    },

    // TODO: The hover rule is not being referenced by JSS.
    '&$hover:hover': {
      '& $border': {
        borderColor: (input: ArwesFrameInput) => getColor(theme, input, 'base'),
        boxShadow: (input: ArwesFrameInput) =>
          `0 0 ${theme.shadowLength}px ` +
          rgba(getColor(theme, input, 'base'), theme.alpha)
      },
      '& $corner': {
        borderColor: (input: ArwesFrameInput) => getColor(theme, input, 'light'),
        boxShadow: (input: ArwesFrameInput) =>
          `0 0 ${theme.shadowLength}px -${theme.shadowLength / 2}px ` +
          rgba(getColor(theme, input, 'light'), theme.alpha)
      }
    }
  },
  box: {
    zIndex: 3,
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    transition: `background-color ${theme.animTime}ms ease-in`,
    backgroundColor: (input: ArwesFrameInput) =>
      input.noBackground
        ? 'transparent'
        : input.active
          ? rgba(lighten(theme.accent, getBg(theme, input)), theme.alpha)
          : rgba(getBg(theme, input), theme.alpha)
  },
  children: {
    display: 'block'
  },

  // Borders

  border: {
    zIndex: 1,
    position: 'absolute',
    borderStyle: 'solid',
    transition: `all ${theme.animTime}ms ease-in`,
    borderColor: (input: ArwesFrameInput) => getColor(theme, input, 'dark'),
    boxShadow: (input: ArwesFrameInput) =>
      `0 0 ${theme.shadowLength}px ` +
      rgba(getColor(theme, input, 'dark'), theme.alpha),
    opacity: 1
  },
  borderLeft: {
    left: 0,
    top: '50%',
    transform: 'translate(0, -50%)',
    borderWidth: '0 0 0 1px',
    height: '100%'
  },
  borderRight: {
    right: 0,
    top: '50%',
    transform: 'translate(0, -50%)',
    borderWidth: '0 0 0 1px',
    height: '100%'
  },
  borderTop: {
    top: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
    borderWidth: '1px 0 0 0',
    width: '100%'
  },
  borderBottom: {
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0)',
    borderWidth: '1px 0 0 0',
    width: '100%'
  },

  // Corners

  corner: {
    zIndex: 2,
    position: 'absolute',
    width: (input: ArwesFrameInput) => cornerLength(input.corners),
    height: (input: ArwesFrameInput) => cornerLength(input.corners),
    transition: `all ${theme.animTime}ms ease-in`,
    borderStyle: 'solid',
    borderColor: (input: ArwesFrameInput) => getColor(theme, input, 'base'),
    boxShadow: (input: ArwesFrameInput) =>
      `0 0 ${theme.shadowLength}px -${theme.shadowLength / 2}px ` +
      rgba(getColor(theme, input, 'base'), theme.alpha),
    opacity: 1
  },
  cornerLT: {
    left: (input: ArwesFrameInput) => -cornerWidth(input.corners),
    top: (input: ArwesFrameInput) => -cornerWidth(input.corners),
    borderWidth: (input: ArwesFrameInput) => `${cornerWidth(input.corners)}px 0 0 ${cornerWidth(input.corners)}px`
  },
  cornerLB: {
    left: (input: ArwesFrameInput) => -cornerWidth(input.corners),
    bottom: (input: ArwesFrameInput) => -cornerWidth(input.corners),
    borderWidth: (input: ArwesFrameInput) => `0 0 ${cornerWidth(input.corners)}px ${cornerWidth(input.corners)}px`
  },
  cornerRT: {
    right: (input: ArwesFrameInput) => -cornerWidth(input.corners),
    top: (input: ArwesFrameInput) => -cornerWidth(input.corners),
    borderWidth: (input: ArwesFrameInput) => `${cornerWidth(input.corners)}px ${cornerWidth(input.corners)}px 0 0`
  },
  cornerRB: {
    right: (input: ArwesFrameInput) => -cornerWidth(input.corners),
    bottom: (input: ArwesFrameInput) => -cornerWidth(input.corners),
    borderWidth: (input: ArwesFrameInput) => `0 ${cornerWidth(input.corners)}px ${cornerWidth(input.corners)}px 0`
  },

});

export const genFrameClassStyle: ComponentClassFn = ({ name, theme }) => {
  return `
.${name} {
  display: block;
  position: relative;
  padding: 1px;
}

.${name} .${name}-box {
  z-index: 3;
  position: relative;
  overflow: hidden;
  display: block;
  transition: background-color ${theme.animTime}ms ease-in;
}

.${name} .${name}-children {
  display: block;
}

.${name} .${name}-border {
  z-index: 1;
  position: absolute;
  border-style: solid;
  transition: all ${theme.animTime}ms ease-in;
  opacity: 1;
}

.${name} .${name}-border-left {
  left: 0;
  top: 50%;
  transform: translate(0, -50%);
  border-width: 0 0 0 1px;
  height: 100%;
}

.${name} .${name}-border-right {
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
  border-width: 0 0 0 1px;
  height: 100%;
}

.${name} .${name}-border-top {
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  border-width: 1px 0 0 0;
  width: 100%;
}

.${name} .${name}-border-bottom {
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  border-width: 1px 0 0 0;
  width: 100%;
}

.${name} .${name}-corner {
  z-index: 2;
  position: absolute;
  transition: all ${theme.animTime}ms ease-in;
  border-style: solid;
  opacity: 1;
}

  `;
};

export const genFrameInstanceStyle: ComponentInstanceFn<ArwesFrameInput> = ({ name, id, theme, input }) => `
.${name}.${id}:hover .${name}-border {
  border-color: ${getColor(theme, input, 'base')};
  box-shadow: 0 0 ${theme.shadowLength}px ${rgba(getColor(theme, input, 'base'), theme.alpha)};
}

.${name}.${id}:hover .${name}-corner {
  border-color: ${getColor(theme, input, 'light')};
  box-shadow: 0 0 ${theme.shadowLength}px -${theme.shadowLength / 2}px ${rgba(getColor(theme, input, 'light'), theme.alpha)};
}

.${name}.${id} .${name}-box {
  background-color: ${
  input.noBackground
    ? 'transparent'
    : input.active
      ? rgba(lighten(theme.accent, getBg(theme, input)), theme.alpha)
      : rgba(getBg(theme, input), theme.alpha)
  }
}

.${name}.${id} .${name}-border {
  border-color: ${getColor(theme, input, 'dark')};
  box-shadow: 0 0 ${theme.shadowLength}px ${rgba(getColor(theme, input, 'dark'), theme.alpha)};
}

.${name}.${id} .${name}-corner {
  width: ${cornerLength(input.corners)}px;
  height: ${cornerLength(input.corners)}px;
  border-color: ${getColor(theme, input, 'base')};
  box-shadow: 0 0 ${theme.shadowLength}px -${theme.shadowLength / 2}px ${rgba(getColor(theme, input, 'base'), theme.alpha)};
}

.${name}.${id} .${name}-cornerLT {
  left: -${cornerWidth(input.corners)}px;
  top: -${cornerWidth(input.corners)}px;
  border-width: ${cornerWidth(input.corners)}px 0 0 ${cornerWidth(input.corners)}px;
}

.${name}.${id} .${name}-cornerLB {
  left: -${cornerWidth(input.corners)}px;
  bottom: -${cornerWidth(input.corners)}px;
  border-width: 0 0 ${cornerWidth(input.corners)}px ${cornerWidth(input.corners)}px;
}

.${name}.${id} .${name}-cornerRT {
  right: -${cornerWidth(input.corners)}px;
  top: -${cornerWidth(input.corners)}px;
  border-width: ${cornerWidth(input.corners)}px ${cornerWidth(input.corners)}px 0 0;
}

.${name}.${id} .${name}-cornerRB {
  right: -${cornerWidth(input.corners)}px;
  bottom: -${cornerWidth(input.corners)}px;
  border-width: 0 ${cornerWidth(input.corners)}px ${cornerWidth(input.corners)}px 0;
}
`;

