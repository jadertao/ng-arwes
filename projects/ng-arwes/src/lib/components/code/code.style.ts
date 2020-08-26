import { rgba } from 'polished';
import { NgArwesTheme } from '../../types/theme.interfaces';

// export const genCodeStyle = (theme: NgArwesTheme) => {
//   return `
// .na-code {
//   display: inline-block;
//   vertical-align: middle;
//   font-family: ${theme.code.fontFamily};
//   font-size: ${theme.code.fontSize}px;
//   line-height: 1.375;
//   direction: ltr;
//   text-align: left;
//   white-space: pre;
//   word-spacing: normal;
//   word-break: normal;
//   moz-tab-size: 2;
//   o-tab-size: 2;
//   tab-size: 2;
//   webkit-hyphens: none;
//   moz-hyphens: none;
//   ms-hyphens: none;
//   hyphens: none;

//   background: ${rgba(theme.code.background, theme.alpha)};
//   color: ${theme.code.color};
//   transition: all ${theme.animTime}ms ease-out;
//   opacity: 1;
// }
// pre.na-code {
//   display: block;
//   margin: 0 0 ${theme.margin}px;
//   padding: ${theme.padding / 2}px;
//   vertical-align: top;
//   overflow: auto;
// }
// .na-code .token.comment,
// .na-code .token.prolog,
// .na-code .token.doctype,
// .na-code .token.cdata,
// .na-code .token.punctuation {
//   color: ${theme.code.comment};
// }
// .na-code .token.punctuation {
//   opacity: 1;
// }
// .na-code .token.tag,
// .na-code .token.operator {
//   color: ${theme.code.operator};
// }

// .na-code .token.property,
// .na-code .token.function {
//   color: ${theme.code.function};
// }

// .na-code .token.tag-id,
// .na-code .token.selector,
// .na-code .token.atrule-id {
//   color: ${theme.code.selector};
// }

// .na-code.language-css,
// .na-code.language-scss,
// .na-code .token.boolean,
// .na-code .token.string,
// .na-code .token.number,
// .na-code .token.entity,
// .na-code .token.url,
// .na-code .language-css .token.string,
// .na-code .language-scss .token.string,
// .na-code .style .token.string,
// .na-code .token.attr-value,
// .na-code .token.keyword,
// .na-code .token.control,
// .na-code .token.directive,
// .na-code .token.unit,
// .na-code .token.statement,
// .na-code .token.regex,
// .na-code .token.atrule] {
//   color: ${theme.code.value}
// }

// .na-code .token.atrule,
// .na-code .token.attr-value,
// .na-code .token.keyword {
//   color: ${theme.code.keyword}
// }

// .na-code .token.placeholder,
// .na-code .token.attr-name,
// .na-code .token.variable] {
//   color: ${theme.code.variable};
// }

// .na-code .token.deleted {
//   text-decoration: line-through;
// }

// .na-code .token.italic {
//   font-style: 'italic';
// }

// .na-code .token.important,
// .na-code .token.bold] {
//   font-weight: bold;
// }

// .na-code  .token.regex,
// .na-code  .token.important] {
//   color: ${theme.code.operator}
// }

// .na-code .token.entity {
//   cursor: help;
// }
//   `;
// };

interface NgArwesCodeStyleParams {
  theme: NgArwesTheme;
}

export const genCodeStyle = {
  root: {
    display: 'inline-block',
    verticalAlign: 'middle',
    fontFamily: ({ theme }: NgArwesCodeStyleParams) => theme.code.fontFamily,
    fontSize: ({ theme }: NgArwesCodeStyleParams) => theme.code.fontSize,
    lineHeight: '1.375',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    mozTabSize: '2',
    oTabSize: '2',
    tabSize: '2',
    webkitHyphens: 'none',
    mozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',

    background: ({ theme }: NgArwesCodeStyleParams) => rgba(theme.code.background, theme.alpha),
    color: ({ theme }: NgArwesCodeStyleParams) => theme.code.color,
    transition: ({ theme }: NgArwesCodeStyleParams) => `all ${theme.animTime}ms ease-out`,
    opacity: 1,

    'pre&': {
      display: 'block',
      margin: ({ theme }: NgArwesCodeStyleParams) => [0, 0, theme.margin],
      padding: ({ theme }: NgArwesCodeStyleParams) => theme.padding / 2,
      verticalAlign: 'top',
      overflow: 'auto'
    },
    // eslint-disable-next-line standard/computed-property-even-spacing
    [`& .token.comment,
      & .token.prolog,
      & .token.doctype,
      & .token.cdata,
      & .token.punctuation`
    ]: {
      color: ({ theme }: NgArwesCodeStyleParams) => theme.code.comment
    },
    '& .token.punctuation': {
      opacity: 1
    },
    // eslint-disable-next-line standard/computed-property-even-spacing
    [`& .token.tag,
      & .token.operator`]: {
      color: ({ theme }: NgArwesCodeStyleParams) => theme.code.operator
    },
    // eslint-disable-next-line standard/computed-property-even-spacing
    [`& .token.property,
      & .token.function`]: {
      color: ({ theme }: NgArwesCodeStyleParams) => theme.code.function
    },
    // eslint-disable-next-line standard/computed-property-even-spacing
    [`& .token.tag-id,
      & .token.selector,
      & .token.atrule-id`]: {
      color: ({ theme }: NgArwesCodeStyleParams) => theme.code.selector
    },
    // eslint-disable-next-line standard/computed-property-even-spacing
    [`&.language-css,
      &.language-scss,
      & .token.boolean,
      & .token.string,
      & .token.number,
      & .token.entity,
      & .token.url,
      & .language-css .token.string,
      & .language-scss .token.string,
      & .style .token.string,
      & .token.attr-value,
      & .token.keyword,
      & .token.control,
      & .token.directive,
      & .token.unit,
      & .token.statement,
      & .token.regex,
      & .token.atrule`]: {
      color: ({ theme }: NgArwesCodeStyleParams) => theme.code.value
    },
    // eslint-disable-next-line standard/computed-property-even-spacing
    [`& .token.atrule,
      & .token.attr-value,
      & .token.keyword`]: {
      color: ({ theme }: NgArwesCodeStyleParams) => theme.code.keyword
    },
    // eslint-disable-next-line standard/computed-property-even-spacing
    [`& .token.placeholder,
      & .token.attr-name,
      & .token.variable`]: {
      color: ({ theme }: NgArwesCodeStyleParams) => theme.code.variable
    },
    '& .token.deleted': {
      textDecoration: 'line-through'
    },
    '& .token.italic': {
      fontStyle: 'italic'
    },
    // eslint-disable-next-line standard/computed-property-even-spacing
    [`& .token.important,
      & .token.bold`]: {
      fontWeight: 'bold'
    },
    // eslint-disable-next-line standard/computed-property-even-spacing
    [`& .token.regex,
      & .token.important`]: {
      color: ({ theme }: NgArwesCodeStyleParams) => theme.code.operator
    },
    '& .token.entity': {
      cursor: 'help'
    }
  },

};
