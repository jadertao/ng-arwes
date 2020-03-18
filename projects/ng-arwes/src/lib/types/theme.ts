
export enum NgArwesLayerStatusEnum {
  Primary = 'primary',
  Secondary = 'secondary',
  Header = 'header',
  Control = 'control',
  Success = 'success',
  Alert = 'alert',
  Disabled = 'disabled',
}

export interface NgArwesLayerStatus {
  primary: string;
  secondary: string;
  header: string;
  control: string;
  success: string;
  alert: string;
  disabled: string;
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
  h1: string;
  h2: string;
  h3: string;
  h4: string;
  h5: string;
  h6: string;
}

export interface NgArwesThemeTypography {
  fontSize: number;
  headerSizes: Record<keyof NgArwesThemeTypographyHeader, number>;
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
  color: Record<keyof NgArwesLayerStatus, NgArwesThemeColor>;
  animTime: number;
  alpha: number;
  shadowLength: number;
  accent: number;
  columns: number;
  typography: NgArwesThemeTypography;
  code: NgArwesThemeCode;
  background: Record<keyof NgArwesLayerStatus, NgArwesThemeBackgroundLevel>;
  responsive: NgArwesThemeReponsiveProps;
}
