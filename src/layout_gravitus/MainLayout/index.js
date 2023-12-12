import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

// Router
import { Link as RouterLink } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '@fontsource/montserrat';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

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
  Button
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

// File Imports
import Notification from './Header/HeaderContent/Notification';
import GravitusNavigationlogin from './Header/Navgrouplogin/Navigationlogin';
import Profile from './Header/HeaderContent/Profile/index';
import GravitusNavigation from './Header/Navgroup/Naviagtion';
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
import GravitusNavigationRegister from './Header/Navgroupregister/NavigationRegister';
import GravitusNavigationLogo from './Header/Navgrouplogo/NavigationLogo';

const ThemePaletteModeContext = React.createContext({
  toggleThemePaletteMode: () => {}
});

const GravitusMainLayout = () => {
  const theme = useTheme();
  const themePaletteModeContext = React.useContext(ThemePaletteModeContext);

  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  const isAuthorised = useSelector((state) => state.user.isAuthenticated);
  const [openDrawer, setopenDrawer] = useState(false); // Drawer

  const toggleDrawer = () => {
    setopenDrawer(!openDrawer);
  };

  const handleCloseDrawer = () => {
    setopenDrawer(false);
  };

  const toggleSuperTheme = () => {
    // Toggle Material Ui Theme
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <AppBar
        sx={{
          position: 'fixed',
          color: 'inherit',
          elevation: '0',
          boxShadow: 'none',
          backgroundColor: theme.palette.mode === 'dark' ? '#0A0A0A' : '#FBFBFB'
        }}
      >
        <Toolbar sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#0A0A0A' : '#FBFBFB' }}>
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
                <IconButton sx={{ color: '#8C8C8C', marginLeft: 'auto', paddingLeft: '8px' }} onClick={toggleDrawer}>
                  <MenuIcon sx={{ width: '28px', height: '28px' }} />
                </IconButton>
              </Grid>
              <Drawer open={openDrawer} onClose={handleCloseDrawer} anchor="right">
                <List>
                  <Box sx={{ width: 350 }}>
                    <IconButton disableRipple sx={{ marginLeft: '290px' }} onClick={toggleDrawer}>
                      <CloseIcon />
                    </IconButton>

                    <ListItem onClick={() => setopenDrawer(false)}>
                      <GravitusNavigation />
                    </ListItem>

                    <ListItem sx={{ pl: 9 }}>
                      <Button
                        disableRipple
                        // onClick={toggleSuperTheme}
                        // onClick={()=> toggleSuperTheme()}
                        onClick={themePaletteModeContext.toggleThemePaletteMode}
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

              <IconButton disableRipple sx={{ ml: 1 }} onClick={themePaletteModeContext.toggleThemePaletteMode} color="inherit">
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
      <Box component="main" sx={{ width: '100%', flexGrow: 1 }}>
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
  const isSystemDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [themePaletteMode, setThemePaletteMode] = React.useState(isSystemDarkMode ? 'dark' : 'light');

  const themePaletteModeContextProvider = React.useMemo(
    () => ({
      toggleThemePaletteMode: () => {
        setThemePaletteMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  const theme = useTheme();
  const themeTypography = Typography('montserrat ');
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
            cardbackgrounddark: '#000000'
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