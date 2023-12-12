import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, CardContent, ClickAwayListener, Divider,
  Grid, IconButton, Paper, Popper, Stack, Tab, Tabs, Typography } from '@mui/material';

import Transitions from '../../../../../components/@extended/Transitions';
import MainCard from '../../../../../components/MainCard';
import ProfileTab from './ProfileTab';

import { logoutUser } from '../../../../../appRedux/actions/adminUser';
import { getProfileURL, fetcher } from '../../../../../api/profile';
import { logoutUserWithToken } from '../../../../../api/auth';

import useSWR from 'swr';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Email = ({ email }) => {
  const theme = useTheme();
  const firstTwo = email.slice(0, 4);
  const lastTwo = email.slice(-10);

  const middle = '***';
  const maskedEmail = `${firstTwo}${middle}${lastTwo}`;

  return (
    <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
      {maskedEmail}
    </Typography>
  );
};

const Profile = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.user);
  
  const handleLogout = async () => {
    try {
      await logoutUserWithToken(token);
      dispatch(logoutUser());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, error, isLoading } = useSWR( getProfileURL(),
    (url) => fetcher(url, { accountType: 'GRAVITUS' })
    // { suspense: true }
  );

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        disableRipple
        sx={{
          p: 0.25,
          bgcolor: 'none',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        // onMouseEnter={handleToggle}
        // onMouseLeave={handleToggle}
        // component={RouterLink} to="/profile"
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" src="" sx={{ width: 24, height: 24 }} />
          {/* <Typography variant='subtitle1'>John Doe</Typography> */}
        </Stack>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
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
          <Transitions type="fade" in={open} {...TransitionProps}>
            {open && (
              <Paper
                sx={{
                  boxShadow: theme.customShadows.z1,
                  width: 290,
                  minWidth: 240,
                  maxWidth: 290,
                  [theme.breakpoints.down('md')]: {
                    maxWidth: 250
                  }
                }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MainCard elevation={0} border={false} content={false}>
                    <Grid p={2} justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1.25} alignItems="center">
                        <Avatar alt="profile user" src="" sx={{ width: 32, height: 32 }} />
                        <Stack>
                          <Email email={user.emailId} />
                          <Stack direction='row' spacing={1} alignItems='flex-end'>
                          <Typography
                            noWrap
                            variant="body1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            {data?.result?.userProfile?.userId}
                          </Typography>
                          <Typography
                            noWrap
                            variant="subtitle2"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' }}
                          >
                             ID
                          </Typography>
                          </Stack>
                          
                        </Stack>
                      </Stack>
                    </Grid>

                    {open && (
                      <>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <ProfileTab handleLogout={handleLogout} setOpen={setOpen} />
                        </Box>
                      </>
                    )}
                  </MainCard>
                </ClickAwayListener>
              </Paper>
            )}
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default Profile;