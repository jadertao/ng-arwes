import { rgba } from 'polished';
import { NgArwesTheme } from '../../types/theme.interfaces';

export const genCodeStyle = (theme: NgArwesTheme) => {
  return `
.arwes-code {
  display: inline-block;
  vertical-align: middle;
  font-family: ${theme.code.fontFamily};
  font-size: ${theme.code.fontSize}px;
  line-height: 1.375;
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  moz-tab-size: 2;
  o-tab-size: 2;
  tab-size: 2;
  webkit-hyphens: none;
  moz-hyphens: none;
  ms-hyphens: none;
  hyphens: none;

  background: ${rgba(theme.code.background, theme.alpha)};
  color: ${theme.code.color};
  transition: all ${theme.animTime}ms ease-out;
  opacity: 1;
}
pre.arwes-code {
  display: block;
  margin: 0 0 ${theme.margin}px;
  padding: ${theme.padding / 2}px;
  vertical-align: top;
  overflow: auto;
}
.arwes-code .token.comment,
.arwes-code .token.prolog,
.arwes-code .token.doctype,
.arwes-code .token.cdata,
.arwes-code .token.punctuation {
  color: ${theme.code.comment};
}
.arwes-code .token.punctuation {
  opacity: 1;
}
.arwes-code .token.tag,
.arwes-code .token.operator {
  color: ${theme.code.operator};
}

.arwes-code .token.property,
.arwes-code .token.function {
  color: ${theme.code.function};
}

.arwes-code .token.tag-id,
.arwes-code .token.selector,
.arwes-code .token.atrule-id {
  color: ${theme.code.selector};
}

.arwes-code.language-css,
.arwes-code.language-scss,
.arwes-code .token.boolean,
.arwes-code .token.string,
.arwes-code .token.number,
.arwes-code .token.entity,
.arwes-code .token.url,
.arwes-code .language-css .token.string,
.arwes-code .language-scss .token.string,
.arwes-code .style .token.string,
.arwes-code .token.attr-value,
.arwes-code .token.keyword,
.arwes-code .token.control,
.arwes-code .token.directive,
.arwes-code .token.unit,
.arwes-code .token.statement,
.arwes-code .token.regex,
.arwes-code .token.atrule] {
  color: ${theme.code.value}
}

.arwes-code .token.atrule,
.arwes-code .token.attr-value,
.arwes-code .token.keyword {
  color: ${theme.code.keyword}
}

.arwes-code .token.placeholder,
.arwes-code .token.attr-name,
.arwes-code .token.variable] {
  color: ${theme.code.variable};
}

.arwes-code .token.deleted {
  text-decoration: line-through;
}

.arwes-code .token.italic {
  font-style: 'italic';
}

.arwes-code .token.important,
.arwes-code .token.bold] {
  font-weight: bold;
}

.arwes-code  .token.regex,
.arwes-code  .token.important] {
  color: ${theme.code.operator}
}

.arwes-code .token.entity {
  cursor: help;
}
  `;
};
