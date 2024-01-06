import React from 'react'
import {
  Button, Grid, Stack, Typography,
  MenuItem, MenuList, Divider, Dialog, useTheme, IconButton
} from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const MenuItems = ({ anchorEl, handleCloseMenu, tabData, value,
  handleOpenDialog, logout, data, handleMenuItemClick, openDialog, handleCloseDialog, warninggif, handleLogout }) => {
  const theme = useTheme();
  return (
    <div>
      <MenuList anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {tabData?.map((tab, index) => (
          <>
              <Stack
                key={index}
                onClick={() => handleMenuItemClick(tab.value)}
                display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
                sx={{
                  marginBottom: '38px',
                  paddingLeft: {
                    xs: '18px',
                    sm: '18px',
                  },
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" justifyContent='space-between'>
                  <Stack direction='row' spacing={1.5} alignItems="center">
                    <img src={theme.palette.mode === 'dark' ? tab.iconactivedark : tab.icon} alt={tab.label} width={24} />
                    <Typography
                      sx={{
                        fontSize: value === tab.value ? '14px' : '14px',
                        fontWeight: value === tab.value ? '500' : '500',
                        color: value === tab.value
                          ? theme.palette.mode === 'dark'
                            ? 'text.white'
                            : 'text.secondary'
                          : theme.palette.mode === 'dark'
                            ? 'text.primarydark'
                            : 'text.primary'
                      }}
                    >
                      {tab.label}
                    </Typography>
                  </Stack>

                  <Stack justifyContent='end' textAlign='end' pr={3} display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
                    <IconButton>
                      <ChevronRightIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            
            <MenuItem
              key={index}
              onClick={() => handleMenuItemClick(tab.value)}
              sx={{
                display: {
                  xs: 'none',
                  sm: 'none',
                  md: 'block',
                  lg: 'block',
                },
                backgroundColor: value === tab.value ? (theme.palette.mode === 'dark' ? '#262B39' : '#FFFFFF') : theme.palette.mode === 'dark' ? '' : '',
                width: '220px',
                height: '51px',
                alignItems: 'center',
                paddingLeft: {
                  md: '42px',
                  lg: '42px',
                },
                
                paddingRight: '0px',
                marginBottom: '8px',
                '&:hover': {
                  backgroundColor: value === tab.value ? (theme.palette.mode === 'dark' ? '#262B39' : '#FFFFFF') : theme.palette.mode === 'dark' ? '' : ''
                }
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" pt={1}>
                <img src={theme.palette.mode === 'dark' ? tab.iconactivedark : tab.icon} alt={tab.label} width={24} />
                <Typography
                  sx={{
                    fontSize: value === tab.value ? '14px' : '14px',
                    fontWeight: value === tab.value ? '500' : '500',
                    color: value === tab.value
                      ? theme.palette.mode === 'dark'
                        ? 'text.white'
                        : 'text.secondary'
                      : theme.palette.mode === 'dark'
                        ? 'text.primary'
                        : 'text.primary'
                  }}
                >
                  {tab.label}
                </Typography>
              </Stack>
            </MenuItem></>
        ))}

        <Grid display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
          <MenuItem
            onClick={handleCloseMenu}
            sx={{ width: '220px', height: '51px' }}
          >
            <Button disableRipple fullWidth sx={{
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}>
              <Stack

                direction="row" spacing={1.4} onClick={handleOpenDialog} sx={{ paddingRight: '52px' }}>
                <img src={logout} alt="logout" width={24} />
                <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary' }}>
                  Logout
                </Typography>
              </Stack>
            </Button>
            {data ? (<>
              <Dialog open={openDialog} onClose={handleCloseDialog} >
                <Stack p={3} spacing={1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground' }}>
                  <img src={warninggif} alt='warninggif' />
                  <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Logout ?
                  </Typography>
                  <Typography textAlign='center' variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    Confirm, if you would like to log out of your account.
                  </Typography>

                  <Stack pt={3} direction="row" spacing={2} justifyContent="space-between">
                    <Button variant="contained5" onClick={handleCloseDialog}>
                      Cancel
                    </Button>
                    <Button variant='contained4' onClick={handleLogout}>
                      Logout
                    </Button>
                  </Stack>

                </Stack>
              </Dialog>
            </>) : (
              <>
              </>
            )}
          </MenuItem>
        </Grid>

      </MenuList>
    </div>
  )
}

export default MenuItems;
