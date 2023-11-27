import myorderiocn from '../../../../assets/images/gravitusimage/myordericon.svg';
import manageposticon from '../../../../assets/images/gravitusimage/manageposticon.svg';
import P2PTrades from '../../../../assets/images/gravitusimage/trades.svg';

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Stack, Typography, Button, useTheme, ClickAwayListener, Paper, Popper, OutlinedInput, Grid, } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import Transitions from '../../../../components/@extended/Transitions';

const Tablehead = ({ isAuthorised }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const theme = useTheme();
  
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}>

      <Button variant="filterbutton" component={RouterLink} to="/P2P_Trades">
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <img src={P2PTrades} alt='P2P_Trades' width={20} />
          <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            P2P Trades
          </Typography>
        </Stack>
      </Button>

      {/* <Button onClick={handleClick} variant="filterbutton">
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <FilterAltOutlinedIcon sx={{ color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary' }} />
          <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            Filter
          </Typography>
        </Stack>
      </Button> */}

      {/* <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        placement="bottom-end"
        role={undefined}
        transition
        // disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <Stack
                    sx={{
                      padding: '16px',
                      alignItems: 'center',
                      bgcolor: theme.palette.mode === "dark" ? "text.black" : "text.background",
                      border: theme.palette.mode === 'dark' ? '0.1px solid #262626' : '0.2 solid #fff',
                    }} pt={1}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Stack spacing={2}>
                          <Stack spacing={1}>
                            <Typography
                              variant="body1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              Price
                            </Typography>
                            <OutlinedInput id="price" type="price" name="price" placeholder="" fullWidth />
                          </Stack>
                          <Stack spacing={1}>
                            <Typography
                              variant="body1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              Quantity
                            </Typography>
                            <OutlinedInput id="Quantity" type="Quantity" name="Quantity" placeholder="" fullWidth />
                          </Stack>
                          <Stack spacing={1}>
                            <Typography
                              variant="body1"
                              sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                            >
                              User ID
                            </Typography>
                            <OutlinedInput id="ID" type="ID" name="ID" placeholder="" fullWidth />
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction="row" spacing={3} pt={1}>
                          <Button variant="cancelbutton">
                            Reset
                          </Button>
                          <Button disableElevation type="submit" variant="buybutton">
                            Apply
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Stack>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper> */}

      {isAuthorised ? (
        <Button variant="managepostbutton" component={RouterLink} to="/P2P_Manage_Ads">
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <img src={manageposticon} alt="managepost" width={18} />
            <Typography variant="subtitle1" color="white">
              Manage Post
            </Typography>
          </Stack>
        </Button>
      ) : (
        <></>
      )}

      {isAuthorised ? (
        <Button variant="filterbutton" component={RouterLink} to="/P2P_My_Trades">
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <img src={myorderiocn} alt="myordricon" />
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              My Trades
            </Typography>
          </Stack>
        </Button>
      ) : (
        <></>
      )}

    </Stack>
  );
};

export default Tablehead;
