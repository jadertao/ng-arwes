import { rgba } from 'polished';
import { NgArwesTheme } from '../../types/theme.interfaces';

export const genListStyle = (theme: NgArwesTheme) => `
.arwes-list {
  display: block;
  margin: 0 0 ${theme.margin}px ${theme.margin}px;
  padding: 0;
}

dl.arwes-list,
ul.arwes-list,
ol.arwes-list {
  margin-bottom: 0;
}

ul.arwes-list {
  margin-left: ${theme.margin + theme.padding / 2}px;
}

ul.arwes-list li {
  display: block;
  list-style: none;
  padding-left: ${theme.padding}px;
}

ul.arwes-list li::before {
  position: relative;
  left: -${theme.padding / 2}px;
  display: inline-block;
  margin-left: -${theme.padding}px;
  content: ">>";
  color: ${theme.color.primary.light};
}

ol.arwes-list {
  margin-left: ${theme.padding}px;
  padding-left: ${theme.typography.fontSize}px;
}

ol.arwes-list {
  margin-left: 0;
}

dl.arwes-list dt {
  font-style: italic;
  font-weight: bold;
}

dl.arwes-list dd {
  margin-left: ${theme.typography.fontSize}px;
}
`;
