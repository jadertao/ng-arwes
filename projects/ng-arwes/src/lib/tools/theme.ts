import { NgArwesTheme, NgArwesThemeColor, NgArwesThemeBackgroundLevel } from '../types/theme';
import { darken, lighten } from 'polished';

const accent = 0.2;
function generateColor(color: string): NgArwesThemeColor {
  return {
    base: color,
    light: lighten(accent, color),
    dark: darken(accent, color)
  };
}

function generateBackground(color: string): NgArwesThemeBackgroundLevel {
  return {
    level0: color,
    level1: lighten(0.015, color),
    level2: lighten(0.03, color),
    level3: lighten(0.045, color)
  };
}

function isPlainObject(item: any): boolean {
  return Object.prototype.toString.call(item) === '[object Object]';
}

export function mergeTheme(target: NgArwesTheme, source: Partial<NgArwesTheme>): NgArwesTheme {
  const output = Object.assign({}, target);
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach(key => {
      if (isPlainObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = mergeTheme(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

export const DEFAULT_THEME: NgArwesTheme = {
  margin: 20,
  padding: 20,

  // Base box or text shadow length.
  shadowLength: 4,

  // Base animation duration in ms.
  animTime: 250,

  // The opacity to apply to elements when needed.
  alpha: 0.65,

  // The color variation.
  accent,

  // Every color has a `base`, `light` and `dark` variation.
  color: {
    primary: generateColor('#26dafd'),
    secondary: generateColor('#df9527'),
    header: generateColor('#a1ecfb'),
    control: generateColor('#acf9fb'),
    success: generateColor('#00ff00'),
    alert: generateColor('#ff0000'),
    disabled: generateColor('#999999')
  },

  // Every background color has level colors from 0 until 3
  // as `level0`, `level1`...
  background: {
    primary: generateBackground('#021114'),
    secondary: generateBackground('#180f02'),
    header: generateBackground('#032026'),
    control: generateBackground('#041e1f'),
    success: generateBackground('#081402'),
    alert: generateBackground('#140202'),
    disabled: generateBackground('#141414')
  },

  typography: {
    lineHeight: 1.5,
    headerSizes: {
      h1: 28,
      h2: 24,
      h3: 21,
      h4: 18,
      h5: 16,
      h6: 16
    },
    fontSize: 21,
    headerFontFamily: '"Electrolize", "sans-serif"',
    fontFamily: '"Titillium Web", "sans-serif"'
  },

  code: {
    fontSize: 14,
    fontFamily:
      'Monaco, "Bitstream Vera Sans Mono", "Lucida Console", Terminal, monospace',
    background: '#000000',
    color: '#3aafff',
    comment: '#4a5f78',
    keyword: '#bB7Dbf',
    operator: '#0075e8',
    function: '#8b6ccf',
    variable: '#3aafff',
    selector: '#3aafff',
    value: '#05d48e'
  },

  // Number of columns inside a row
  columns: 12,

  // Until the number in device screen width the breakpoint is taken.
  // E.g. Until the `small` number is viewport small, from `small + 1` is medium.
  // After `large` one it is `xlarge`.
  responsive: {
    small: 600,
    medium: 992,
    large: 1200
  }
};
