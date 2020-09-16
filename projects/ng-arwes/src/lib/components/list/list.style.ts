import { NgArwesTheme } from '../../types/theme.interfaces';

interface NgArwesImageStyleParams {
  theme: NgArwesTheme;
}

export const NgArwesULStyles = {
  marginLeft: ({ theme }: NgArwesImageStyleParams) => theme.margin + theme.padding / 2,

  '& li': {
    display: 'block',
    listStyle: 'none',
    paddingLeft: ({ theme }: NgArwesImageStyleParams) => theme.padding
  },
  '& li:before': {
    position: 'relative',
    left: ({ theme }: NgArwesImageStyleParams) => -(theme.padding / 2),
    display: 'inline-block',
    marginLeft: ({ theme }: NgArwesImageStyleParams) => -theme.padding,
    content: '">>"',
    color: ({ theme }: NgArwesImageStyleParams) => theme.color.primary.light
  }
};

export const NgArwesOLStyles = {
  marginLeft: ({ theme }: NgArwesImageStyleParams) => theme.padding,
  paddingLeft: ({ theme }: NgArwesImageStyleParams) => theme.typography.fontSize,

  '& ol': {
    marginLeft: 0
  }
};

export const NgArwesDLStyles = {
  '& dt': {
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  '& dd': {
    marginLeft: ({ theme }: NgArwesImageStyleParams) => theme.typography.fontSize
  }
};

export const NgArwesListSelfStyles = {
  display: 'block',
  margin: ({ theme }: NgArwesImageStyleParams) => [0, 0, theme.margin, theme.margin],
  padding: 0,

  '& dl, & ul, & ol': {
    marginBottom: 0
  }
};



export const NgArwesListStyles = {
  root: {
    ...NgArwesListSelfStyles,
    'ul&': NgArwesULStyles,
    'ol&': NgArwesOLStyles,
    'dl&': NgArwesDLStyles
  }
};
