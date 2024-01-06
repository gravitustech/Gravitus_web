
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
import warninggif from '../../../assets/images/gravitusimage/warninggif.svg';

import React, { useState } from 'react';

import {
  Button, Grid, Stack, Typography,
  MenuItem, MenuList, Divider, Dialog, useTheme, IconButton
} from '@mui/material';

import { TabContext, TabPanel } from '@mui/lab';

import Faq from './Faq';
import Support from './Support';
import Payment from './Payment';
import Security from './Security';
import Useridentity from './Useridentity';
import Dashboard from './Dashboard/Dashboard';

import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import { logoutUserWithToken } from '../../../api/auth';
import CustomSnackBar from '../../../components/snackbar';
import { logoutUser } from '../../../appRedux/actions/adminUser';
import Lodergif from 'src/components/Gravitusloader';
import { Account_Info, Logout_User, fetcherSystem } from 'src/api_ng/system_ng';
import { mutate } from 'swr';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuItems from './MenuItems';

function ProfileScreen() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const page = useLocation().pathname.split('/')[2];
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState(false); //logout dialog

  const handleOpenDialog = (row) => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  function useProfile() {
    var postData = { accountType: 'GRAVITUS' };

    const { data, error, isLoading, mutate } = useSWR([Account_Info(), postData], fetcherSystem, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading, mutate };
  }

  const { data, error, isLoading, mutate } = useProfile();
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

  React.useEffect(() => {
    setValue(indexToTabname[page]);
  }, [page]);

  const handleMenuItemClick = (newValue) => {
    navigate(`/profile/${tabNameToIndex[newValue]}`);
    setValue(newValue);
    handleCloseMenu();
  };

  const handleLogout = () => {
    try {
      // console.log({ values });
      Logout_User(token);
      dispatch(logoutUser());
      navigate('/');
    } catch (err) {
      // console.log(err);
    }
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
          setValue={setValue}
          anchorEl={anchorEl} handleCloseMenu={handleCloseMenu} value={value} handleOpenDialog={handleOpenDialog} logout={logout} data={data} handleMenuItemClick={handleMenuItemClick}
          openDialog={openDialog} handleCloseDialog={handleCloseDialog} warninggif={warninggif} handleLogout={handleLogout}
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


  const goBack = () => {
    navigate(-1);
  }

  return (
    <>
      <Grid
        lg={12} pt={0} sx={{ minHeight: { xs: 'calc(107vh - 134px)', md: 'calc(107vh - 112px)' }, backgroundColor: theme.palette.mode === 'dark' ? '#0F121A' : '#F7F7F7' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Grid display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
            <MenuItems anchorEl={anchorEl} handleCloseMenu={handleCloseMenu} tabData={tabData} value={value} handleOpenDialog={handleOpenDialog} logout={logout} data={data} handleMenuItemClick={handleMenuItemClick}
              openDialog={openDialog} handleCloseDialog={handleCloseDialog} warninggif={warninggif} handleLogout={handleLogout}
            />
          </Grid>
          <Grid item pt={1} display={{ xs: 'none', md: 'block', lg: 'block' }}>
            <Divider orientation="vertical" sx={{ height: '100%' }} />
          </Grid>

          <TabContext value={value}>
            {data ? (
              <>
                {data &&
                  tabData.map((tab) => (
                    <TabPanel key={tab.value} value={tab.value} sx={{
                      width: '100%', padding:
                      {
                        xs: '0px',
                        sm: '0px',
                        md: '13px',
                        lg: '13px'
                      }
                    }}>
                      {tab.screen}
                    </TabPanel>
                  ))}
              </>) : (
              <>
                <Stack sx={{ width: '100%' }}>
                  <Lodergif />
                </Stack>
              </>
            )}
          </TabContext>
        </div>
        <CustomSnackBar
          snackbarOpen={snackbarOpen}
          setSnackbarOpen={setSnackbarOpen}
          snackbarMessage={snackbarMessage && snackbarMessage.msg}
          success={snackbarMessage && snackbarMessage.success}
        />
      </Grid>
      {/* Mobile view */}

      {/* <Grid
        display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
        }}
      >
        <Dashboard userData={data?.result?.userProfile}
          setSnackbarMessage={setSnackbarMessage}
          setSnackbarOpen={setSnackbarOpen}
          mutate={mutate} />
      </Grid> */}
    </>
  );
}

export default ProfileScreen;
