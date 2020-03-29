
export enum NgArwesLayerStatusEnum {
  Primary = 'primary',
  Secondary = 'secondary',
  Header = 'header',
  Control = 'control',
  Success = 'success',
  Alert = 'alert',
  Disabled = 'disabled',
}

export interface NgArwesThemeColor {
  dark: string;
  light: string;
  base: string;
}

export interface NgArwesThemeBackgroundLevel {
  level0: string;
  level1: string;
  level2: string;
  level3: string;
  [key: string]: string;
}

export interface NgArwesThemeTypographyHeader {
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;
}

export interface NgArwesThemeTypography {
  fontSize: number;
  headerSizes: Partial<NgArwesThemeTypographyHeader>;
  headerFontFamily: string;
  fontFamily: string;
  lineHeight: number;
}


export interface NgArwesThemeCode {
  fontFamily: string;
  comment: string;
  color: string;
  operator: string;
  function: string;
  selector: string;
  value: string;
  keyword: string;
  variable: string;
  fontSize: number;
  background: string;
}

export interface NgArwesThemeReponsiveProps {
  small: number;
  medium: number;
  large: number;
}

export interface NgArwesTheme {
  margin: number;
  padding: number;
  color: Partial<Record<NgArwesLayerStatusEnum, NgArwesThemeColor>>;
  animTime: number;
  alpha: number;
  shadowLength: number;
  accent: number;
  columns: number;
  typography: Partial<NgArwesThemeTypography>;
  code: NgArwesThemeCode;
  background: Partial<Record<NgArwesLayerStatusEnum, NgArwesThemeBackgroundLevel>>;
  responsive: Partial<NgArwesThemeReponsiveProps>;
}
