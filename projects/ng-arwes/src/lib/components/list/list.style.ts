import { rgba } from 'polished';
import { NgArwesTheme } from '../../types/theme.interfaces';

export const genListStyle = (theme: NgArwesTheme) => `
.arwes-list {
  display: block;
  margin: 0 0 ${theme.margin} ${theme.margin}px;
  padding: 0;
}

.arwes-list dl,
.arwes-list ul,
.arwes-list ol {
  margin-bottom: 0;
}

.arwes-list ul {
  margin-left: ${theme.margin + theme.padding / 2}px;
}

.arwes-list ul li {
  display: block;
  list-style: none;
  padding-left: ${theme.padding}px;
}

.arwes-list ul li::before {
  position: ralative;
  left: -${theme.padding / 2}px;
  display: inline-block;
  margin-left: -${theme.padding}px;
  content: ">>";
  color: ${theme.color.primary.light};
}

.arwes-list ol {
  margin-left: ${theme.padding}px;
  padding-left: ${theme.typography.fontSize}px;
}

.arwes-list ol li {
  margin-left: 0;
}

.arwes-list dl dt {
  font-style: 'italic';
  font-weight: bold;
}

.arwes-list dl dd {
  margin-left: ${theme.typography.fontSize};
}
`;
