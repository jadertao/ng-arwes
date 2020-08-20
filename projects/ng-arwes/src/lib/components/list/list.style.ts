import { rgba } from 'polished';
import { NgArwesTheme } from '../../types/theme.interfaces';

export const genListStyle = (theme: NgArwesTheme) => `
.na-list {
  display: block;
  margin: 0 0 ${theme.margin}px ${theme.margin}px;
  padding: 0;
}

dl.na-list,
ul.na-list,
ol.na-list {
  margin-bottom: 0;
}

ul.na-list {
  margin-left: ${theme.margin + theme.padding / 2}px;
}

ul.na-list li {
  display: block;
  list-style: none;
  padding-left: ${theme.padding}px;
}

ul.na-list li::before {
  position: relative;
  left: -${theme.padding / 2}px;
  display: inline-block;
  margin-left: -${theme.padding}px;
  content: ">>";
  color: ${theme.color.primary.light};
}

ol.na-list {
  margin-left: ${theme.padding}px;
  padding-left: ${theme.typography.fontSize}px;
}

ol.na-list {
  margin-left: 0;
}

dl.na-list dt {
  font-style: italic;
  font-weight: bold;
}

dl.na-list dd {
  margin-left: ${theme.typography.fontSize}px;
}
`;
