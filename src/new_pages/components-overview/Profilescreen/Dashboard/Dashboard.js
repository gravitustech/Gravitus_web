import React, { useState } from 'react';

import {
  Grid, Box, useTheme, Card, Stack,
  Typography, Tooltip, IconButton
} from '@mui/material';

import DoneIcon from '@mui/icons-material/Done';
import CopyToClipboard from 'react-copy-to-clipboard';

import Profiledetails from './Profiledetails';
import referimg from '../../../../assets/images/gravitusimage/referimg.svg';
import copyicon from '../../../../assets/images/gravitusimage/copyicon.svg';
import appqrcode from '../../../../assets/images/gravitusimage/appqrcode.svg';
import googleplay from '../../../../assets/images/gravitusimage/googleplay.svg';

const Referrallink = ({ referrallink }) => {
  const theme = useTheme();
  const firstTwo = referrallink.slice(0, 10);
  const lastTwo = referrallink.slice(-4);
  const middle = '...';

  const Referrallink = `${firstTwo}${middle}${lastTwo}`;

  return (
    <Tooltip title={referrallink} arrow placement="top">
      <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
        {Referrallink}
      </Typography>
    </Tooltip>
  );
};

const Email = ({ email }) => {
  const theme = useTheme();
  const firstTwo = email.slice(0, 4);
  const lastTwo = email.slice(-10);
  const middle = '***';

  const maskedEmail = `${firstTwo}${middle}${lastTwo}`;

  return (
    <Tooltip title={email} arrow placement="top">
      <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
        {maskedEmail}
      </Typography>
    </Tooltip>
  );
};

const Dashboard = ({ userData, setSnackbarMessage, setSnackbarOpen, mutate }) => {
  const theme = useTheme();

  const [activeId, setActiveId] = useState(null);
  const [copied, setCopied] = useState(false);

  var hostName = process.env.REACT_APP_HOST_URL;

  const handleCopy = (id) => {
    setActiveId(id);
    setCopied(true);

    setTimeout(() => {
      setActiveId(null);
      setCopied(false);
    }, 2000);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container pl={0} pr={2} pb={3} spacing={2}>
        <Grid item xs={12} sm={6} md={12}>
          <Card
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <Profiledetails userData={userData} setSnackbarMessage={setSnackbarMessage} setSnackbarOpen={setSnackbarOpen} mutate={mutate} />
          </Card>
        </Grid>

        <Grid item xs={8}>
          <Card
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <Grid
              pl={3}
              pr={3}
              pt={5.5}
              pb={{ lg: .5, md: 3, sm: 3, xs: 3 }}
              sx={{
                background:
                  theme.palette.mode === 'dark'
                    ? ' linear-gradient(0deg, #000 0%, #444E68 100%)'
                    : 'linear-gradient(360deg, rgba(39, 222, 191, 0.43) 0%, rgba(222, 255, 250, 0.00) 100%)',
                boxshadow: theme.palette.mode === 'dark' ?
                  ' 0px 0.25px 4.257px 0px rgba(0, 0, 0, 0.01), 0px 2px 34px 0px rgba(0, 0, 0, 0.03)' :
                  '0px 0.25043103098869324px 4.257327556610107px 0px rgba(0, 0, 0, 0.01), 0px 2px 34px 0px rgba(0, 0, 0, 0.03)1x',
                borderRadius: '10px'
              }}
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Grid lg={8} md={12} pl={5} pt={3} pr={5}>
                <Stack spacing={2}>
                  <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                    Refer friends and Earn Crypto together
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    Share your referral ID or link.
                  </Typography>

                  <Card
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark' ? '#262b39' : 'rgba(245, 245, 245, 0.51)',
                      borderRadius: '5px',
                      boxShadow: 'none'
                    }}
                  >
                    <Grid
                      p={1}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Referral ID
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Email email={userData.emailId} />
                        <CopyToClipboard text={userData.emailId} onCopy={() => handleCopy(1)}>
                          <Tooltip placement="top" disableFocusListener title={activeId === 1 && copied ? 'Copied' : 'Click to copy'} arrow>
                            <IconButton disableRipple>
                              {activeId === 1 && copied ? (
                                <DoneIcon color="#C1C1C1" />
                              ) : (
                                <img src={copyicon} alt="copy" style={{ cursor: 'pointer' }} />
                              )}
                            </IconButton>
                          </Tooltip>
                        </CopyToClipboard>
                      </Stack>
                    </Grid>
                  </Card>

                  <Card
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark' ? '#262b39' : 'rgba(245, 245, 245, 0.51)',
                      borderRadius: '5px',
                      boxShadow: 'none'
                    }}
                  >
                    <Grid
                      p={1}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        textAlign: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        Referral Link
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Referrallink referrallink={`${hostName}/register/${userData.emailId}`} />
                        <CopyToClipboard text={`${hostName}/register/${userData.emailId}`} onCopy={() => handleCopy(2)}>
                          <Tooltip placement="top" disableFocusListener title={activeId === 2 && copied ? 'Copied' : 'Click to copy'} arrow>
                            <IconButton disableRipple>
                              {activeId === 2 && copied ? (
                                <DoneIcon color="#C1C1C1" />
                              ) : (
                                <img src={copyicon} alt="copy" style={{ cursor: 'pointer' }} />
                              )}
                            </IconButton>
                          </Tooltip>
                        </CopyToClipboard>
                      </Stack>
                    </Grid>
                  </Card>
                </Stack>
              </Grid>

              <Grid lg={4} pt={14.5} display={{ xs: 'none', md: 'none', lg: 'block' }}>
                <img src={referimg} alt="referimg" />
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card
            variant="outlined"
            sx={{
              borderColor: theme.palette.mode === 'dark' ? '#232730' : '#ececec',
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
            }}
          >
            <Grid p={3}>
              <Stack spacing={2} justifyContent="center" alignItems="center">
                <img src={appqrcode} alt="appqrcode" style={{ width: 120 }} />
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                >
                  <Typography variant="h4">Scan Now</Typography>
                  <Typography variant="h4">or</Typography>
                  <Typography variant="h4">Download on</Typography>
                </Stack>
                <a href="https://play.google.com/store/apps/details?id=io.gravitus.exchange">
                  <img src={googleplay} alt="googleplay" style={{ width: 120 }} />
                </a>
              </Stack>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
{
  /* <Grid p={3}>
              <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Typography variant='h4' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  Your Wallet
                </Typography>
                <Button disableripple variant="managepostbutton" component={RouterLink} to="/wallet">
                  <Typography variant="title1" color="white">
                    Go to Wallet
                  </Typography>
                </Button>
              </Grid>
              <Walletgrid />
            </Grid> */
}
