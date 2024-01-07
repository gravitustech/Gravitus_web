import React, { useState } from 'react';
//icons
import dashboard from '../../../../assets/images/gravitusimage/dashboard.svg';
import dashboarddark from '../../../../assets/images/gravitusimage/dashboarddark.svg';
import dashboardactivedark from '../../../../assets/images/gravitusimage/dashboardactivedark.svg';

import paymenticon from '../../../../assets/images/gravitusimage/Paymenticon.svg';
import paymenticondark from '../../../../assets/images/gravitusimage/Paymenticondark.svg';
import paymenticonactivedark from '../../../../assets/images/gravitusimage/paymenticonactivedark.svg';

import useridentity from '../../../../assets/images/gravitusimage/useridentity.svg';
import useridentitydark from '../../../../assets/images/gravitusimage/useridentitydark.svg';
import useridentityactivedark from '../../../../assets/images/gravitusimage/useridentityactivedark.svg';

import security from '../../../../assets/images/gravitusimage/security.svg';
import securitydark from '../../../../assets/images/gravitusimage/securitydark.svg';
import securityactivedark from '../../../../assets/images/gravitusimage/securityactivedark.svg';

import support from '../../../../assets/images/gravitusimage/supportlight.svg';
import supportdark from '../../../../assets/images/gravitusimage/supportdark.svg';
import supportactivedark from '../../../../assets/images/gravitusimage/supportactivedark.svg';

import faq from '../../../../assets/images/gravitusimage/faq.svg';
import faqdark from '../../../../assets/images/gravitusimage/faqdark.svg';
import faqactivedark from '../../../../assets/images/gravitusimage/faqactivedark.svg';

import {
  Grid, Box, useTheme, Card, Stack,
  Typography, Tooltip, IconButton, Button, Divider, Paper
} from '@mui/material';

import DoneIcon from '@mui/icons-material/Done';
import CopyToClipboard from 'react-copy-to-clipboard';
import { RWebShare } from "react-web-share";
import ShareIcon from '@mui/icons-material/Share';
import Profiledetails from './Profiledetails';
import referimg from '../../../../assets/images/gravitusimage/referimg.svg';
import copyicon from '../../../../assets/images/gravitusimage/copyicon.svg';
import appqrcode from '../../../../assets/images/gravitusimage/appqrcode.svg';
import googleplay from '../../../../assets/images/gravitusimage/googleplay.svg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Lodergif from 'src/components/Gravitusloader';
import { useNavigate } from 'react-router';
import MenuItems from '../MenuItems';
import Payment from '../Payment';
import Useridentity from '../Useridentity';
import Security from '../Security';
import Support from '../Support';
import Faq from '../Faq';

const Referrallink = ({ referrallink }) => {
  const theme = useTheme();
  const firstTwo = referrallink?.slice(0, 14);
  const lastTwo = referrallink?.slice(-4);
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
  const firstTwo = email?.slice(0, 4);
  const lastTwo = email?.slice(-10);
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

const Dashboard = ({ userData, setSnackbarMessage, setSnackbarOpen, mutate,
  anchorEl, handleCloseMenu, value, setValue,
  handleOpenDialog, logout, data, handleMenuItemClick, openDialog, handleCloseDialog, warninggif, handleLogout
}) => {

  const tabData = [
    {
      value: '1',
      iconactivedark: value === '1' ? paymenticonactivedark : paymenticon,
      icon: value === '1' ? paymenticondark : paymenticon,
      label: 'Payment',
      screen: (
        <Payment
          setValue={setValue}
          userData={data?.result?.payModes}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarOpen={setSnackbarOpen}
          mutate={mutate}
        />
      )
    },
    {
      value: '2',
      iconactivedark: value === '2' ? useridentityactivedark : useridentity,
      icon: value === '2' ? useridentitydark : useridentity,
      label: 'User Identity',
      screen: (
        <Useridentity
          setValue={setValue}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarOpen={setSnackbarOpen}
          userData={data?.result?.identity}
          mutate={mutate}
        />
      )
    },
    {
      value: '3',
      iconactivedark: value === '3' ? securityactivedark : security,
      icon: value === '3' ? securitydark : security,
      label: 'Security',
      screen: <Security setSnackbarMessage={setSnackbarMessage} setSnackbarOpen={setSnackbarOpen} mutate={mutate} />
    },
    {
      value: '4',
      iconactivedark: value === '4' ? supportactivedark : support,
      icon: value === '4' ? supportdark : support,
      label: 'Support',
      screen: <Support setSnackbarMessage={setSnackbarMessage} setSnackbarOpen={setSnackbarOpen} mutate={mutate} />
    },
    // { value: '5', icon: value === '5' ? aboutdark : about, label: 'About', screen: <About /> },
    {
      value: '6',
      iconactivedark: value === '6' ? faqactivedark : faq,
      icon: value === '6' ? faqdark : faq,
      label: 'FAQ’s',
      screen: <Faq />
    }
  ];

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

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <>
      <Grid
        display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
        sx={{
          minHeight: { xs: 'calc(107vh - 134px)', md: 'calc(107vh - 112px)' },
          backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
        }}
      >
        <Stack direction="row" spacing={1} alignItems='center' pb={1} justifyContent='space-between'>
          <Stack pl={1} spacing={1} justifyContent='start' direction='row' alignItems='center'>
            <IconButton onClick={goBack} disableRipple>
              <ArrowBackIcon
                sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
              />
            </IconButton>
            <Stack justifyContent='start'>
              <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                Account
              </Typography>
            </Stack>
          </Stack>

          <Stack justifyContent='end' pr={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <RWebShare
                data={{
                  text: "Welcome to GRAVITUS. Trading Platform for Budding Crypto Traders, Register Now. Through this Referral Link",
                  url: `${hostName}/register/GR${userData.userId}`,
                  title: "Gravitus Crypto Exchange",
                }}
              >
                <Tooltip placement="top" arrow title='Share'>
                  <ShareIcon sx={{ cursor: 'pointer', fontSize: '20px', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                  </ShareIcon>
                </Tooltip>
              </RWebShare>
            </Stack>
          </Stack>

        </Stack>
        <Profiledetails userData={userData} setSnackbarMessage={setSnackbarMessage} setSnackbarOpen={setSnackbarOpen} mutate={mutate} />
        <Stack p={2}>
          <Divider></Divider>
        </Stack>
        <MenuItems
          tabData={tabData}
          anchorEl={anchorEl} handleCloseMenu={handleCloseMenu} value={value} handleOpenDialog={handleOpenDialog} logout={logout} data={data} handleMenuItemClick={handleMenuItemClick}
          openDialog={openDialog} handleCloseDialog={handleCloseDialog} warninggif={warninggif} handleLogout={handleLogout} />
        <Paper
          sx={{
            position: "fixed", bottom: 1, left: 16, right: 16,
          }}
          elevation={0}
        >
          {["bottom"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button variant="spotsellbutton"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </React.Fragment>
          ))}
        </Paper>
      </Grid>

      <Box sx={{ flexGrow: 1 }} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
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
                          <Typography variant="title1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                            GR{userData.userId}
                          </Typography>
                          {/* <Email email={userData.emailId} /> */}
                          <CopyToClipboard text={`GR${userData.userId}`} onCopy={() => handleCopy(1)}>
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
                        pr={2}
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
                          <Referrallink referrallink={`${hostName}/register/GR${userData.userId}`} />
                          <RWebShare
                            data={{
                              text: "Welcome to GRAVITUS. Trading Platform for Budding Crypto Traders, Register Now. Through this Referral Link",
                              url: `${hostName}/register/GR${userData.userId}`,
                              title: "Gravitus Crypto Exchange",
                            }}
                          >
                            <Tooltip placement="top" arrow title='Share'>
                              <ShareIcon sx={{ cursor: 'pointer', fontSize: '20px' }}></ShareIcon>
                            </Tooltip>
                          </RWebShare>
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
        </Grid >
      </Box >
    </>

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
