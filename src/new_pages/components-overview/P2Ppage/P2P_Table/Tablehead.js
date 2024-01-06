import myorderiocn from '../../../../assets/images/gravitusimage/myordericon.svg';
import manageposticon from '../../../../assets/images/gravitusimage/manageposticon.svg';
import P2PTrades from '../../../../assets/images/gravitusimage/trades.svg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import PendingIcon from '@mui/icons-material/Pending';

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Stack, Typography, Button, useTheme, Card, ButtonBase, Popover, } from '@mui/material';

const Tablehead = ({ isAuthorised }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isIconUp, setIsIconUp] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsIconUp(false);
    setIsIconUp((prev) => !prev);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsIconUp(false);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}
        display={{ xs: 'none', sm: 'block', md: 'block', lg: 'block' }}
      >

        <Button variant="filterbutton" component={RouterLink} to="/P2P_Trades">
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <img src={P2PTrades} alt='P2P_Trades' width={20} />
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              P2P Trades
            </Typography>
          </Stack>
        </Button>

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

      {/* Mobile view */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={3}
        display={{ xs: 'block', sm: 'none', md: 'none', lg: 'none' }}
      >
        {isAuthorised ? (
          <div>
            <ButtonBase disableRipple aria-describedby={id} onClick={handleClick}>
              <PendingIcon fontSize='42px' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} />
              {isIconUp ? <ArrowDropUpIcon sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.secondary' }} /> : <ArrowDropDownIcon sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.secondary' }} />}
            </ButtonBase>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Card
                variant="outlined"
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
                  padding: '16px'
                }}
              >
                <Stack spacing={1.5}>
                  <Button variant="filterbutton" component={RouterLink} to="/P2P_Trades">
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <img src={P2PTrades} alt='P2P_Trades' width={20} />
                      <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        P2P Trades
                      </Typography>
                    </Stack>
                  </Button>

                  <Stack>
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
                  </Stack>

                  <Stack>
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
                </Stack>
              </Card>
            </Popover>
          </div>
        ) : (
          <>
            <Stack>
              <Button variant="filterbutton" component={RouterLink} to="/P2P_Trades">
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <img src={P2PTrades} alt='P2P_Trades' width={20} />
                </Stack>
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </>
  );
};

export default Tablehead;
