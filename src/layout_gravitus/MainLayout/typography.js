// ==============================|| DEFAULT THEME - TYPOGRAPHY  ||============================== //
export function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

const Typography = (fontFamily) => ({

  h1: {
    fontSize: 28,
    fontWeight: 600,
  },
  h2: {
    fontSize: 24,
    fontWeight: 400,
  },
  h3: {
    fontSize: 20,
    fontWeight: 500,
  },
  h4: {
    fontSize: 20,
    fontWeight: 600,
  },
  h5: {
    fontSize: 18,
    fontWeight: 600,
  },
  title1: {
    fontSize: 16,
    fontWeight: 700,
  },
  title2: {
    fontSize: 16,
    fontWeight: 500,
  },
  title3: {
    fontSize: 16,
    fontWeight: 400,
  },

  body1: {
    fontSize: 14,
    fontWeight: 500,
  },
  body2: {
    fontSize: 14,
    fontWeight: 400,
  },
  body3: {
    fontSize: 14,
    fontWeight: 700,
  },

  subtitle1: {
    fontSize: 12,
    fontWeight: 500,
  },
  subtitle2: {
    fontSize: 12,
    fontWeight: 400,
  },
  subtitle3: {
    fontSize: 11,
    fontWeight: 500,
  },
  head1: {
    fontSize: 48,
    fontWeight: 700,
  },
  head2: {
    fontSize: 24,
    fontWeight: 600
  },
  head3: {
    fontSize: pxToRem(42),
    ...responsiveFontSizes({xs:14, sm: 36, md: 36, lg: 42 }),
    // fontSize: 42,
    fontWeight: 700
  },
  //other
  htmlFontSize: 16,
  fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  // h1: {
  //   fontWeight: 600,
  //   fontSize: '38px',
  //   lineHeight: 1.21
  // },
  // h2: {
  //   fontWeight: 600,
  //   fontSize: '30px',
  //   lineHeight: 1.27
  // },
  // h3: {
  //   fontWeight: 700,
  //   fontSize: '24px',
  //   lineHeight: 1.33
  // },
  // h4: {
  //   fontWeight: 600,
  //   fontSize: '20px',
  //   lineHeight: 1.4
  // },
  // h5: {
  //   fontWeight: 400,
  //   fontSize: '16px',
  //   lineHeight: 1.5
  // },
  h6: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: 1.57
  },
  caption: {
    fontWeight: 400,
    fontSize: '12px',
  },
  caption1: {
    fontWeight: 600,
    fontSize: '12px',
  },
  // body1: {
  //   fontSize: '14px',
  //   lineHeight: 1.57,
  //   fontWeight: 400
  // },
  // body2: {
  //   fontSize: '12px',
  //   lineHeight: 1.66
  // },
  // subtitle1: {
  //   fontSize: '14px',
  //   fontWeight: 600,
  //   lineHeight: 1.57
  // },
  // subtitle2: {
  //   fontSize: '12px',
  //   fontWeight: 500,
  //   lineHeight: 1.66
  // },
  // subtitle3: {
  //   fontSize: '14px',
  //   fontWeight: 500,
  //   lineHeight: 1.57
  // },
  overline: {
    lineHeight: 1.66
  },
  button: {
    textTransform: 'capitalize'
  },
  subtitle4: {
    color: '#262626',
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '42px',
    paddingLeft: '12px'
  },
  listicon: {
    minWidth: 28,
    borderRadius: 1.5,
    width: '24px',
    height: '24px',
  },
  inlinetext: {
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '22px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 600,
  },
  // title1: {
  //   fontSize: '32px',
  //   fontWeight: 700,
  // },
  // title2: {
  //   fontSize: '16px',
  //   fontWeight: 700,
  // },
  // title3: {
  //   fontSize: '38px',
  //   fontWeight: 900,
  //   lineheight: '57px'
  // },
  title4: {
    fontSize: '20px',
    fontWeight: 700,
  },
  title5: {
    fontSize: '16px',
    fontWeight: 500,
  },
  title6: {
    fontSize: '16px',
    fontWeight: 600,
  },

});

export default Typography;
