import React, { useState } from 'react';
import { Button, Grid, Stack, Typography, MenuItem, MenuList, Divider } from '@mui/material';
import { TabContext } from '@mui/lab';
import { useTheme } from '@emotion/react';
import Dashboard from './Dashboard/Dashboard';
import Payment from './Payment';
import Useridentity from './Useridentity';
import Security from './Security';
import About from './About';
import Faq from './Faq';
import Support from './Support';
import TabPanel from '@mui/lab/TabPanel';
import { useLocation, useNavigate } from 'react-router';

//icons
import dashboard from '../../../assets/images/gravitusimage/dashboard.svg';
import dashboarddark from '../../../assets/images/gravitusimage/dashboarddark.svg';
import dashboardactivedark from '../../../assets/images/gravitusimage/dashboardactivedark.svg';

import paymenticon from '../../../assets/images/gravitusimage/Paymenticon.svg';
import paymenticondark from '../../../assets/images/gravitusimage/Paymenticondark.svg';
import paymenticonactivedark from '../../../assets/images/gravitusimage/paymenticonactivedark.svg';

import useridentity from '../../../assets/images/gravitusimage/useridentity.svg';
import useridentitydark from '../../../assets/images/gravitusimage/useridentitydark.svg';
import useridentityactivedark from '../../../assets/images/gravitusimage/useridentityactivedark.svg';

import security from '../../../assets/images/gravitusimage/security.svg';
import securitydark from '../../../assets/images/gravitusimage/securitydark.svg';
import securityactivedark from '../../../assets/images/gravitusimage/securityactivedark.svg';

import support from '../../../assets/images/gravitusimage/supportlight.svg';
import supportdark from '../../../assets/images/gravitusimage/supportdark.svg';
import supportactivedark from '../../../assets/images/gravitusimage/supportactivedark.svg';

import faq from '../../../assets/images/gravitusimage/faq.svg';
import faqdark from '../../../assets/images/gravitusimage/faqdark.svg';
import faqactivedark from '../../../assets/images/gravitusimage/faqactivedark.svg';

import logout from '../../../assets/images/gravitusimage/logout.svg';
import { getProfileURL, fetcher } from '../../../api/profile';
import useSWR from 'swr';
import CustomSnackBar from '../../../components/snackbar';
import { logoutUserWithToken } from '../../../api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../appRedux/actions/adminUser';

function ProfileScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const page = useLocation().pathname.split('/')[2];
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  console.log(page);
  const { data, error, isLoading, mutate } = useSWR(
    getProfileURL(),
    (url) => fetcher(url, { accountType: 'GRAVITUS' })
    // { suspense: true }
  );

  // console.log('res', data, error, isLoading);

  const tabNameToIndex = {
    0: 'dashboard',
    1: 'payment',
    2: 'useridentity',
    3: 'security',
    4: 'support',
    5: 'about',
    6: 'faq'
  };
  const indexToTabname = {
    dashboard: '0',
    payment: '1',
    useridentity: '2',
    security: '3',
    support: '4',
    about: '5',
    faq: '6'
  };
  const [value, setValue] = React.useState(indexToTabname[page]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (newValue) => {
    navigate(`/profile/${tabNameToIndex[newValue]}`);
    setValue(newValue);
    handleCloseMenu();
  };

  const tabData = [
    {
      value: '0',
      iconactivedark: value === '0' ? dashboardactivedark : dashboard,
      icon: value === '0' ? dashboarddark : dashboard,
      label: 'Dashboard',
      screen: (
        <Dashboard
          userData={data?.result?.userProfile}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarOpen={setSnackbarOpen}
          mutate={mutate}
        />
      )
    },
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

  const handleLogout = async () => {
    console.log('asas');
    try {
      // console.log({ values });
      await logoutUserWithToken(token);
      dispatch(logoutUser());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Grid lg={12} pt={3} sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'text.black' : 'text.white' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <MenuList anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
          {tabData.map((tab) => (
            <MenuItem
              key={tab.value}
              onClick={() => handleMenuItemClick(tab.value)}
              sx={{
                backgroundColor:
                  value === tab.value ? (theme.palette.mode === 'dark' ? '#232323' : '#EFEFEF') : theme.palette.mode === 'dark' ? '' : '',
                width: '220px',
                height: '51px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '42px',
                paddingRight: '0px',
                marginBottom: '8px',
                '&:hover': {
                  backgroundColor:
                    value === tab.value ? (theme.palette.mode === 'dark' ? '#232323' : '#EFEFEF') : theme.palette.mode === 'dark' ? '' : ''
                }
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <img src={theme.palette.mode === 'dark' ? tab.iconactivedark : tab.icon} alt={tab.label} width={24} />
                <Typography
                  sx={{
                    fontSize: value === tab.value ? '14px' : '14px',
                    fontWeight: value === tab.value ? '500' : '500',
                    color:
                      value === tab.value
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
            </MenuItem>
          ))}
          <MenuItem
            onClick={handleCloseMenu}
            sx={{ width: '220px', height: '51px', display: 'flex', alignItems: 'start', paddingLeft: '36px' }}
          >
            <Button disableRipple>
              <Stack direction="row" spacing={1.4} onClick={handleLogout}>
                <img src={logout} alt="logout" width={24} />
                <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary' }}>
                  Logout
                </Typography>
              </Stack>
            </Button>
          </MenuItem>
        </MenuList>
        <Grid item pt={1} display={{ xs: 'none', md: 'none', lg: 'block' }}>
          <Divider orientation="vertical" sx={{ height: '100%' }} />
        </Grid>
        <TabContext value={value}>
          {data &&
            tabData.map((tab) => (
              <TabPanel key={tab.value} value={tab.value} sx={{ width: '100%', padding: '13px' }}>
                {tab.screen}
              </TabPanel>
            ))}
        </TabContext>
      </div>
      <CustomSnackBar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarMessage={snackbarMessage && snackbarMessage.msg}
        success={snackbarMessage && snackbarMessage.success}
      />
    </Grid>
  );
}

export default ProfileScreen;
