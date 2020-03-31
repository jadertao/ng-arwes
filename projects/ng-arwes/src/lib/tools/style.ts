export function styleObject2String(style: Record<string, string | number>) {
  return Object.keys(style).reduce((res, key) => {
    return `${res} ${key}:${style[key]};`;
  }, '');
}
