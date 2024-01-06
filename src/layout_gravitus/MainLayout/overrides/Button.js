// ==============================|| OVERRIDES - BUTTON ||============================== //

export default function Button(theme) {
  const disabledStyle = {
    '&.Mui-disabled': {
      backgroundColor: theme.palette.grey[200]
    }
  };
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontsize: '20px'
        },
        contained: {
          backgroundColor: '#00BBAB',
          color: '#fff',
          borderColor: '#00BBAB',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: '5px',
          fontWeight: '700',
          fontSize: '16px',
          '&:hover': {
            backgroundColor: '#00A899',
            bordercolor: '#BFBFBF'
          }
        },
        contained1: {
          backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#FFF',
          color: '#959595',
          borderColor: theme.palette.mode === 'dark' ? '#31384b' : '#E1E1E1',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: '5px',
          fontWeight: '700',
          fontSize: '16px',
          '&:hover': {
            backgroundColor: '#FAFAFA'
          }
        },
        contained2: {
          backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F9F9F9',
          color: theme.palette.mode === 'dark' ? '#BFBFBF' : '#959595',
          borderRadius: '5px',
          height: '64px'
        },

        contained4: {
          width: '179px',
          height: '38px',
          backgroundColor: theme.palette.mode === 'dark' ? '#00BBAB' : '#00BBAB',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#00BBAB'
          }
        },
        contained6: {
          width: '264px',
          height: '38px',
          backgroundColor: theme.palette.mode === 'dark' ? '#00BBAB' : '#00BBAB',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#00BBAB'
          }
        },
        contained5: {
          width: '179px',
          height: '38px',
          backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F4F4F4',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: theme.palette.mode === 'dark' ? '#cfcfcf' : '#8c8c8c',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F4F4F4',
          }
        },
        //
        confirmsell: {
          width: '179px',
          height: '38px',
          backgroundColor: '#FF4E4E',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#FF4E4E'
          }
        },
        //
        inrdepositbutton: {
          width: '100%',
          height: '49px',
          borderRadius: '5px',
          color: theme.palette.mode === 'dark' ? '#F7F7F7' : '#8C8C8C',
          backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F5F5F5',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F5F5F5'
          }
        },
        //
        inrdepositwithdrawbutton: {
          width: '280px',
          borderRadius: '5px',
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? '#31384b' : 'text.tertiary',
          bgcolor: 'transparent',
          '&:hover': {
            bgcolor: 'transparent'
          }
        },
        p2pbuybutton: {
          width: '128px',
          height: '32px',
          borderRadius: '3px',
          background: ' #00BBAB',
          '&:hover': {
            background: '#00BBAB'
          }
        },
        p2psellbutton: {
          width: '128px',
          height: '32px',
          borderRadius: '3px',
          background: '#FF4E4E',
          '&:hover': {
            background: '#FF4E4E'
          }
        },
        //
        managepostbutton: {
          borderRadius: '5px',
          background: '#00BBAB',
          height: '32px',
          '&:hover': {
            background: 'var(--hover, #00BBAB)'
          }
        },
        filterbutton: {
          height: '32px',
          borderRadius: '5px',
          border: theme.palette.mode === 'dark' ? '1px solid var(--disabled, #545f7f)' : '1px solid var(--disabled, #BFBFBF)',
          background: 'transparent'
        },
        //
        //TableContainercss
        tablecontainer: {
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        },
        //wallet deposit withdraw button
        walletbutton: {
          maxWidth: '179px',
          '@media (min-width: 480px)': {
            width: '200px',
          },
          '@media (min-width: 768px)': {
            width: '179px',
          },
          '@media (min-width: 600px)': {
            width: '179px',
          },
          '@media (min-width: 1200px)': {
            width: '179px',
          },
          height: '38px',
          backgroundColor: theme.palette.mode === 'dark' ? '#262b39' : '#FFFFFF',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: theme.palette.mode === 'dark' ? '#F7F7F7' : '#8C8C8C',
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? '#31384b' : '#E1E1E1',
          '&:hover': {
            background: theme.palette.mode === 'dark' ? '#262b39' : '#FFFFFF'
          }
        },
        //cancel button
        p2pcancelbutton: {
          width: '40%',
          height: '40px',
          backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F0F0F0',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: theme.palette.mode === 'dark' ? '#cfcfcf' : '#8c8c8c',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F0F0F0'
          }
        },
        p2pnextbutton: {
          height: '40px',
          width: '75%',
          backgroundColor: '#00BBAB',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#00BBAB'
          }
        },
        //
        cancelbutton: {
          width: '40%',
          height: '38px',
          backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F0F0F0',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: theme.palette.mode === 'dark' ? '#cfcfcf' : '#8c8c8c',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F0F0F0'
          }
        },
        //Spotmbl cancel button
        spotmblcancelbutton: {
          // width: '40%',
          // height: '38px',
          backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F0F0F0',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F0F0F0'
          }
        },
        //
        supportbutton: {
          width: '50%',
          height: '38px',
          backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F0F0F0',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: theme.palette.mode === 'dark' ? '#D9D9D9' : '#8c8c8c',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F0F0F0'
          }
        },
        sellAppealbutton: {
          height: '40px',
          width: '40%',
          backgroundColor: theme.palette.mode === 'dark' ? '#0F121A' : '#F0F0F0',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 700,
          color: theme.palette.mode === 'dark' ? '#D9D9D9' : '#8c8c8c',
          border: theme.palette.mode === 'dark' ? '1px solid var(--primary, #262B39)' : 'px solid var(--primary, #F7F7F7)',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#0F121A' : '#F0F0F0',
          }
        },
        buybutton: {
          height: '38px',
          width: '75%',
          backgroundColor: '#00BBAB',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#00BBAB'
          }
        },
        managepostbuybutton: {
          height: '46px',
          width: '100%',
          backgroundColor: '#00BBAB',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 500,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#00BBAB'
          }
        },
        //
        spotbuybutton: {
          height: '41px',
          width: '100%',
          backgroundColor: '#00BBAB',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#00BBAB'
          }
        },
        //
        spotsellbutton: {
          height: '41px',
          width: '100%',
          backgroundColor: '#FF4E4E',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#FF4E4E'
          }
        },
        //
        updatebutton: {
          height: '38px',
          width: '50%',
          backgroundColor: '#00BBAB',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#00BBAB'
          }
        },
        Appealbutton: {
          height: '38px',
          width: '75%',
          backgroundColor: '#FFFFFF',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 700,
          color: '#262626',
          border: '1px solid var(--primary, #8C8C8C)',
          '&:hover': {
            backgroundColor: '#FFFFFF'
          }
        },
        sellbutton: {
          height: '38px',
          width: '75%',
          backgroundColor: '#FF4E4E',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 500,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#FF4E4E',
          },
        },
        managepostsellbutton: {
          height: '46px',
          width: '100%',
          backgroundColor: '#FF4E4E',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 500,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#FF4E4E',
          },
        },
        confirmrecipt: {
          height: '40px',
          width: '75%',
          backgroundColor: '#FF4E4E',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 500,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#FF4E4E',
          },
        },
        //
        fundsbutton: {
          fontSize: '10px',
          fontWeight: 600,
          height: '32px',
          width: '100%',
          borderRadius: '5px',
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? '#31384b' : '#E1E1E1',
          background: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        //update button
        editbutton: {
          width: '94px',
          height: '19px',
          backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F5F5F5',
          borderRadius: '13px',
          fontSize: '12px',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? '#262B39' : '#F5F5F5',
          }
        },
        //homeregisterbutton
        homeregisterbutton: {
          maxWidth: '246px',
          '@media (min-width: 480px)': {
            width: '156px',
          },
          '@media (min-width: 768px)': {
            width: '246px',
          },
          '@media (min-width: 600px)': {
            width: '246px',
          },
          '@media (min-width: 1200px)': {
            width: '246px',
          },
          height: '40px',
          borderRadius: '10px',
          backgroundColor: '#00BBAB',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 700,
          '&:hover': {
            backgroundColor: '#00BBAB'
          }
        },
        //homeloginbutton
        homeloginbutton: {
          maxWidth: '246px',
          '@media (min-width: 480px)': {
            width: '156px',
          },
          '@media (min-width: 768px)': {
            width: '246px',
          },
          '@media (min-width: 600px)': {
            width: '246px',
          },
          '@media (min-width: 1200px)': {
            width: '246px',
          },
          height: '40px',
          borderRadius: '10px',
          border: '2px solid var(--secondary-light, #D9D9D9)',
          backgroundColor: 'transparent',
          color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#262626',
          fontSize: '16px',
          fontWeight: 700,
          '&:hover': {
            backgroundColor: 'transparent'
          }
        },
        //homespotbutton
        homespotbutton: {
          maxWidth: '180px',
          '@media (min-width: 480px)': {
            width: '143px',
          },
          '@media (min-width: 768px)': {
            width: '180px',
          },
          '@media (min-width: 600px)': {
            width: '180px',
          },
          '@media (min-width: 1200px)': {
            width: '180px',
          },
          height: '40px',
          textAlign: 'center',
          borderRadius: '5px',
          backgroundColor: '#00BBAB',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 700,
          '&:hover': {
            backgroundColor: '#00BBAB'
          }
        },
        //404pagebutton
        pagebutton404: {
          maxWidth: '156px',
          '@media (min-width: 480px)': {
            width: '156px',
          },
          '@media (min-width: 768px)': {
            width: '156px',
          },
          '@media (min-width: 600px)': {
            width: '156px',
          },
          '@media (min-width: 1200px)': {
            width: '156px',
          },
          height: '40px',
          borderRadius: '83px',
          backgroundColor: '#00BBAB',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 600,
          '&:hover': {
            backgroundColor: '#00BBAB'
          }
        },
        outlined: {
          ...disabledStyle
        }
      }
    }
  };
}
