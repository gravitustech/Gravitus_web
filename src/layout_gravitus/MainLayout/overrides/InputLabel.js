// ==============================|| OVERRIDES - INPUT LABEL ||============================== //

export default function InputLabel(theme) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.grey[600]
        },

        outlined: {
          lineHeight: '0.8em',
          '&.MuiInputLabel-sizeSmall': {
            lineHeight: '1em'
          },
          '&.MuiInputLabel-shrink': {
            background: theme.palette.background.paper,
            padding: '0 8px',
            marginLeft: -6,
            lineHeight: '1.4375em'
          }
        }
      }
    },
    MuiInputBase: {
      // Adding style overrides for the InputBase component
      styleOverrides: {
        root: {
          color: theme.palette.mode === 'dark' ? 'white' : 'black'
        },
        input: {
          '&::placeholder': {
            color: theme.palette.mode === 'dark' ? 'white' : 'black' // Set the desired color for the placeholder text
          },
          '&:-webkit-autofill': {
            WebkitBoxShadow:
              theme.palette.mode === 'dark' ? '0 0 0 1000px #131722 inset !important' : '0 0 0 1000px white inset !important',
            backgroundColor: 'red !important'
          }
        }
      }
    }
  };
}
