// material-ui
import { alpha } from '@mui/material/styles';

// ==============================|| OVERRIDES - OUTLINED INPUT ||============================== //

export default function OutlinedInput(theme) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '10.5px 14px 10.5px 12px'
        },
        notchedOutline: {
          borderColor: theme.palette.mode === 'dark' ? '#31384b' : 'grey[300]'
        },
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00BBAB'
          },
          '&.Mui-focused': {
            // boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
            boxShadow: `0 0 0 2px ${alpha('#00BBAB', 0.2)}`,
            '& .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${'#00BBAB'}`
            }
          },
          '&.Mui-error': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.error.light
            },
            '&.Mui-focused': {
              boxShadow: `0 0 0 2px ${alpha(theme.palette.error.main, 0.2)}`,
              '& .MuiOutlinedInput-notchedOutline': {
                border: `1px solid ${theme.palette.error.light}`
              }
            }
          }
        },
        inputSizeSmall: {
          padding: '7.5px 8px 7.5px 12px'
        },
        inputMultiline: {
          padding: 0
        }
      }
    }
  };
}
