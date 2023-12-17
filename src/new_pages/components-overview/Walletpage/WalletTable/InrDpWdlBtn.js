import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Box, Paper, Popper, Stack, Button, Typography, useTheme, ClickAwayListener, Dialog, Card } from '@mui/material';

import Transitions from '../../../../components/@extended/Transitions';
import doticon from '../../../../assets/images/gravitusimage/doticon.svg';
import InrIcon from '../../../../assets/images/gravitusimage/Inricon.svg';
import InrDeposit from '../../../../assets/images/gravitusimage/Inrdeposit.svg';
import ArrowRightIcon from '../../../../assets/images/gravitusimage/arrowrighticon.svg';
import { Pre_Rs_Deposit, fetcherWallet } from 'src/api_ng/wallet_ng';


import useSWR from 'swr';
// ==============================|| HEADER CONTENT - PROFILE ||============================== //
const Inrdepositwithdrawbutton = ({ setSnackbarOpen,
  setSnackbarMessage }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (row) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const popoverhandleClose = () => {
    setAnchorEl(null);
  };

  const popoveropen = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function useINR_Predeposit() {
    var postData = { walletId: 17 };

    const { data, error, isLoading } = useSWR([Pre_Rs_Deposit(), postData], fetcherWallet, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const {
    data: walletINRRc,
    error: walletINREr,
    isLoading: isWALLETINRDataLoading
  } = useINR_Predeposit();

  if (walletINREr) {
    // Call Logout User
  }

  const INRdepositConfirm = () => {
    if (walletINRRc.error !== 'ok') {
      if (walletINRRc.error.name == "Missing Authorization") {
        // Logout User
      }
      else if (walletINRRc.error.name == "Invalid Authorization") {
        // Logout User
      }
      else {
        if (walletINRRc.error.name != undefined) {
          setSnackbarMessage({ msg: walletINRRc.error.name, success: false });
          setSnackbarOpen(true);
          handleCloseDialog();
        }
        else if (walletINRRc.error.action != undefined) {
          setSnackbarMessage({ msg: walletINRRc.error.message, success: false });
          setSnackbarOpen(true);
          handleCloseDialog();
        }
        else {
          setSnackbarMessage({ msg: walletINRRc.error, success: false });
          setSnackbarOpen(true);
          handleCloseDialog();
        }
      }
    } else {
      navigate('/inrdeposit');
    }
  };

  const INRwithdrawConfirm = () => {
    if (walletINRRc.error !== 'ok') {
      if (walletINRRc.error.name == "Missing Authorization") {
        // Logout User
      }
      else if (walletINRRc.error.name == "Invalid Authorization") {
        // Logout User
      }
      else {
        if (walletINRRc.error.name != undefined) {
          setSnackbarMessage({ msg: walletINRRc.error.name, success: false });
          setSnackbarOpen(true);
          handleCloseDialog();
        }
        else if (walletINRRc.error.action != undefined) {
          setSnackbarMessage({ msg: walletINRRc.error.message, success: false });
          setSnackbarOpen(true);
          handleCloseDialog();
        }
        else {
          setSnackbarMessage({ msg: walletINRRc.error, success: false });
          setSnackbarOpen(true);
          handleCloseDialog();
        }
      }
    } else {
      navigate('/inrwithdraw');
    }
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button onClick={handleOpenDialog} variant="inrdepositwithdrawbutton">
          <Stack direction="row" spacing={1}>
            <img src={InrIcon} alt="InrIcon" width={16} />
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              INR Deposit/Withdraw
            </Typography>
          </Stack>
        </Button>
        <Dialog open={openDialog} onClose={handleCloseDialog} >
          <Card
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <Stack p={3} pb={5} spacing={2} width={437} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
              <Typography pt={1} pb={1} sx={{ fontSize: '18px', fontWeight: 600, color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                Select the option to Deposit or Withdraw INR
              </Typography>
              <Button onClick={INRdepositConfirm} variant="inrdepositbutton">
                <Stack direction="row" spacing={1} pr={0} >
                  {/* <img src={InrDeposit} alt="InrDeposit" width={30} /> */}
                  <Typography
                    pl={1.5}
                    variant="title2"
                    sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                    pt={0.5}
                  >
                    INR Deposit
                  </Typography>
                  <Stack pl={25} pt={1.2}>
                    <img src={ArrowRightIcon} alt="ArrowRightIcon" width={10} />
                  </Stack>
                </Stack>
              </Button>
              <Button onClick={INRwithdrawConfirm} variant="inrdepositbutton">
                <Stack direction="row" spacing={1} pr={0} >
                  {/* <img src={InrDeposit} alt="InrDeposit" width={30} /> */}
                  <Typography
                    pl={1.5}
                    variant="title2"
                    sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                    pt={0.5}
                  >
                    INR Withdraw
                  </Typography>
                  <Stack pl={23} pt={1.2}>
                    <img src={ArrowRightIcon} alt="ArrowRightIcon" width={10} />
                  </Stack>
                </Stack>
              </Button>
            </Stack>
          </Card>
        </Dialog>

        <Popper
          id={id}
          open={popoveropen}
          anchorEl={anchorEl}
          onClose={popoverhandleClose}
          placement="top-end"
          role={undefined}
          transition
          disablePortal
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
            <Transitions type="fade" in={popoveropen} {...TransitionProps}>
              {popoveropen && (
                <Paper>
                  <ClickAwayListener onClickAway={popoverhandleClose}>
                    <Stack
                      sx={{
                        padding: '16px',
                        alignItems: 'center',
                        bgcolor: theme.palette.mode === 'dark' ? 'text.black' : 'text.background',
                        border: theme.palette.mode === 'dark' ? '0.1px solid #262626' : '0.2 solid #fff'
                      }}
                      pt={1}
                    >
                      <Button component={RouterLink} to="/inrdeposit" variant="inrdepositbutton">
                        <Stack direction="row" spacing={1} pr={0}>
                          <img src={InrDeposit} alt="InrDeposit" width={30} />
                          <Typography
                            pl={1.5}
                            variant="title2"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                            pt={0.5}
                          >
                            INR Deposit
                          </Typography>
                          <Stack pl={2} pt={1.2}>
                            <img src={ArrowRightIcon} alt="ArrowRightIcon" width={10} />
                          </Stack>
                        </Stack>
                      </Button>
                      <br />
                      <Button component={RouterLink} to="/inrwithdraw" variant="inrdepositbutton">
                        <Stack direction="row" spacing={1.5}>
                          <img src={InrDeposit} alt="InrDeposit" width={30} />
                          <Typography
                            pl={1}
                            variant="title2"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                            pt={0.5}
                          >
                            INR Withdraw
                          </Typography>
                          <Stack pt={1.2}>
                            <img src={ArrowRightIcon} alt="ArrowRightIcon" width={10} />
                          </Stack>
                        </Stack>
                      </Button>
                    </Stack>
                  </ClickAwayListener>
                </Paper>
              )}
            </Transitions>
          )}
        </Popper>
      </Stack>
    </Box>
  );
};

export default Inrdepositwithdrawbutton;
