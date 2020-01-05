const palette = {
  light: {
    black: '#000000',
    white: '#FFFFFF',
    gray: '#A0A0A0',
    lightGray: '#E3E3E3',
    lighterGray: '#FAFAFA',
    green: '#28B155',
    twitch: '#9146FF',
    red: '#FF0500'
  },
  dark: {
    white: '#000000',
    black: '#FFFFFF'
  }
};

const typography = {
  headline: 'Inter',
  body: 'Inter'
};

const layout = {
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridColumnGap: '24px',
  mobileMaxWidth: '780px',
  contentMaxWidth: '1300px'
};

const baseTheme = {
  typography,
  layout
};

export const darkTheme = {
  palette: palette.dark,
  ...baseTheme
};

export const lightTheme = {
  palette: palette.light,
  ...baseTheme
};
