import '@fontsource/inter';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/700.css';

// Styles
import {
  Grid,
  AppBar,
  Toolbar,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  createTheme,
  ThemeProvider,
  Drawer,
  List,
  ListItem,
  Button,
  Stack
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// File Imports
import GravitusNavigationlogin from './Header/Navgrouplogin/Navigationlogin';
import Notification from './Header/HeaderContent/Notification';
import GravitusNavigation from './Header/Navgroup/Naviagtion';
import Profile from './Header/HeaderContent/Profile/index';

import Typography from './typography';
import CustomShadows from './shadows';

// import Palette from './palette';
import ComponentsOverrides from './overrides';

// Logo Imports
import Logo from '../../components/Logo/Logo';
import Logo1 from '../../components/Logo/Logo1';

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import GravitusNavigationLogo from './Header/Navgrouplogo/NavigationLogo';
import GravitusNavigationRegister from './Header/Navgroupregister/NavigationRegister';

import PropTypes from 'prop-types';
import { useMemo } from 'react';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../appRedux/reducers/appConfig';

// Router
import { Link, Outlet } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { getConfig_ng, setConfig_ng } from 'src/utils_ng/localStorage_ng';

const ThemePaletteModeContext = React.createContext({
  toggleThemePaletteMode: () => { }
});

const GravitusMainLayout = () => {
  const theme = useTheme();
  const themePaletteModeContext = React.useContext(ThemePaletteModeContext);

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  const isAuthorised = useSelector((state) => state.user.isAuthenticated);

  const [openDrawer, setopenDrawer] = useState(false);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setopenDrawer(!openDrawer);
  };

  const handleCloseDrawer = () => {
    setopenDrawer(false);
  };

  const toggleSuperTheme = () => {
    themePaletteModeContext.toggleThemePaletteMode();
    dispatch(toggleTheme());
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <AppBar
        sx={{
          position: 'fixed',
          color: 'inherit',
          elevation: '0',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.white', height: '0px', paddingLeft: '16px', paddingRight: '16px' }}>
          {isMatch ? (
            <>
              <Grid container>
                <Grid item xs={6} align="left">
                  <Link component={RouterLink} to="/">
                    <Logo />
                  </Link>
                </Grid>
                <Grid item xs={6} align="right"></Grid>
              </Grid>
              {isAuthorised ? (
                <>
                  <Profile />
                  <Notification />
                </>
              ) : (
                <>
                  <GravitusNavigationlogin />
                  <GravitusNavigationRegister />
                </>
              )}
              <Grid item xs={6} align="right">
                <IconButton sx={{ color: '#8C8C8C', marginLeft: 'auto', paddingLeft: '18px' }} onClick={toggleDrawer}>
                  <MenuIcon sx={{ width: '28px', height: '28px' }} />
                </IconButton>
              </Grid>
              <Drawer
                PaperProps={{
                  style: {
                    width: '100%',
                    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.text.cardbackgrounddark : theme.palette.text.cardbackground,
                  },
                }}
                open={openDrawer} onClose={handleCloseDrawer} anchor="right">
                <List
                // sx={{backgroundColor:theme.palette.mode==='dark'?'#131722':'text.white'}}
                >
                  <Box>
                    <Stack pb={1} pt={3} pr={3} direction='row' spacing={0.5} justifyContent="end">
                      <IconButton disableRipple onClick={toggleDrawer}>
                        <CloseIcon fontSize="large" />
                      </IconButton>
                    </Stack>

                    <ListItem onClick={() => setopenDrawer(false)}>
                        <GravitusNavigation />
                    </ListItem>

                    <ListItem sx={{ pl: 6 }}>
                      <Button
                        disableRipple
                        onClick={() => toggleSuperTheme()}
                        color="inherit"
                        sx={{ height: '32px' }}
                      >
                        {theme.palette.mode === 'dark' ? (
                          <>
                            <WbSunnyIcon disableRipple sx={{ color: 'text.white' }} />
                            <h4
                              color="text.black"
                              style={{
                                fontSize: '16px',
                                fontWeight: 500,
                                lineHeight: '42px',
                                paddingLeft: '12px'
                              }}
                            >
                              Light Mode
                            </h4>
                          </>
                        ) : (
                          <>
                            <DarkModeIcon sx={{ color: 'text.black' }} />
                            <h4
                              color="text.primary"
                              style={{
                                fontSize: '16px',
                                fontWeight: 500,
                                lineHeight: '42px',
                                paddingLeft: '12px'
                              }}
                            >
                              Dark Mode
                            </h4>
                          </>
                        )}
                      </Button>
                    </ListItem>
                  </Box>
                </List>
              </Drawer>
            </>
          ) : (
            <>
              <GravitusNavigationLogo />
              <Grid item align="left">
                <Link component={RouterLink} to="/">
                  <Logo1 />
                </Link>
              </Grid>
              <GravitusNavigation />
              <Box sx={{ width: '100%' }} />
              {isAuthorised ? (
                <>
                  <Profile />
                  <Notification />
                </>
              ) : (
                <>
                  <GravitusNavigationlogin />
                  <GravitusNavigationRegister />
                </>
              )}

              <IconButton disableRipple sx={{ ml: 1 }} onClick={() => toggleSuperTheme()} color="inherit">
                {theme.palette.mode === 'dark' ? (
                  <WbSunnyIcon sx={{ color: 'text.white' }} />
                ) : (
                  <DarkModeIcon sx={{ color: 'text.black' }} />
                )}
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ width: '100%', flexGrow: 1, background: theme.palette.mode === 'dark' ? '#0F121A' : '#F7F7F7', }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

GravitusMainLayout.propTypes = {
  open: PropTypes.bool,
  handleDrawerToggle: PropTypes.func
};

export default function App() {
  const storedThemeMode = useSelector((state) => state.config.theme);
  const isSystemDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themePaletteMode, setThemePaletteMode] = useState(storedThemeMode || (isSystemDarkMode ? 'dark' : 'light'));

  const themePaletteModeContextProvider = React.useMemo(
    () => ({
      toggleThemePaletteMode: () => {
        setThemePaletteMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  const theme = useTheme();
  const themeTypography = Typography('inter');
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeProvider = React.useMemo(
    () =>
      createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 768,
            md: 1024,
            lg: 1266,
            xl: 1536
          }
        },
        direction: 'ltr',
        mixins: {
          toolbar: {
            minHeight: 60,
            paddingTop: 10,
            paddingBottom: 8,
            paddingLeft: 24,
            paddingRight: 24
          }
        },
        typography: themeTypography,
        customShadows: themeCustomShadows,
        palette: {
          mode: themePaletteMode,
          background: {
            default: themePaletteMode === 'dark' ? '#0A0A0A' : '#FBFBFB' // Example background color
          },
          text: {
            //lightmode
            primary: '#8C8C8C',
            secondary: '#262626',
            tertiary: '#BFBFBF',
            white: '#FFFFFF',
            black: '#000000',
            buy: '#00BBAB',
            sell: '#FF4E4E',
            cardbackground: '#FFFFFF',

            //darkmode
            primarydark: '#D9D9D9',
            secondarydark: '#FFFFFF',
            tertiarydark: '#F0F0F0',
            cardbackgrounddark: '#131722'
          }
        }
      }),
    [themePaletteMode, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeProvider);
  themes.components = ComponentsOverrides(themes);

  return (
    <ThemePaletteModeContext.Provider value={themePaletteModeContextProvider}>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        <GravitusMainLayout />
      </ThemeProvider>
    </ThemePaletteModeContext.Provider>
  );
}