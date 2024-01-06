import p2pinricon from '../../../../assets/images/gravitusimage/p2pinricon.svg';
import usdticon from '../../../../assets/images/gravitusimage/usdticon.svg';
import usericon from '../../../../assets/images/gravitusimage/usericon.svg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CloseIcon from '@mui/icons-material/Close';

import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useTheme, Card, Stack, Typography, OutlinedInput, InputAdornment, Box, Tab, IconButton, Grid, Drawer, Button } from '@mui/material';

import Tablehead from './Tablehead';
import P2pbuyordertab from './P2P_Match_BUY/index';
import P2psellordertab from './P2P_Match_SELL/index';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const P2P_Table = ({ isAuthorised, P2PData, setSnackbarOpen, setSnackbarMessage }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState('0'); // Buy or Sell Tab

  const [priceSearchQuery, setPriceSearchQuery] = useState('');
  const [quantitySearchQuery, setQuantitySearchQuery] = useState('');
  const [useridSearchQuery, setUseridSearchQuery] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCancel = (field) => {
    switch (field) {
      case 'price':
        setPriceSearchQuery('');
        break;
      case 'quantity':
        setQuantitySearchQuery('');
        break;
      case 'userid':
        setUseridSearchQuery('');
        break;
      default:
        break;
    }
  };

  const [isIconUp, setIsIconUp] = React.useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setIsIconUp(false);
  };

  const DrawerOpen = () => {
    setOpenDrawer(!openDrawer);
    setIsIconUp((prev) => !prev);
  }

  const ResetButton = () => {
    handleCancel('price');
    handleCancel('quantity');
    handleCancel('userid');
    setOpenDrawer(false);
    setIsIconUp(false);
  }

  const FilterField = () => {
    return (
      <>
        <Stack spacing={{ xs: 1.5, sm: 1.5, md: 1, lg: 1 }} direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }}>
          <OutlinedInput
            id="Price"
            type="Price"
            name="Price"
            placeholder="Enter Price"
            value={priceSearchQuery}
            onChange={(e) => setPriceSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              // Allow only numeric values, Backspace, Enter, and decimal point
              const isValidKey = /^[0-9\b\r.]+$/.test(e.key);
              // Allow only one decimal point
              const hasDecimalPoint = /\./.test(e.target.value);
              if (hasDecimalPoint && e.key === '.') {
                e.preventDefault();
              }
              if (!isValidKey) {
                e.preventDefault();
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <Stack direction='row' alignItems='center' spacing={.8}>
                  {priceSearchQuery && (
                    <IconButton disableRipple edge="end" onClick={() => handleCancel('price')} size="small">
                      <HighlightOffIcon fontSize="small" sx={{
                        color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
                      }} />
                    </IconButton>
                  )}
                  <Stack display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                    <img src={p2pinricon} alt='p2pinricon' width={18} />
                  </Stack>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                  >
                    INR
                  </Typography>
                </Stack>
              </InputAdornment>
            } />
          <OutlinedInput
            id="Quantity"
            type="Quantity"
            name="Quantity"
            placeholder="Enter Quantity"
            value={quantitySearchQuery}
            onChange={(e) => setQuantitySearchQuery(e.target.value)}
            onKeyPress={(e) => {
              // Allow only numeric values, Backspace, Enter, and decimal point
              const isValidKey = /^[0-9\b\r.]+$/.test(e.key);
              // Allow only one decimal point
              const hasDecimalPoint = /\./.test(e.target.value);
              if (hasDecimalPoint && e.key === '.') {
                e.preventDefault();
              }
              if (!isValidKey) {
                e.preventDefault();
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <Stack direction='row' alignItems='center' spacing={.8}>
                  {quantitySearchQuery && (
                    <IconButton disableRipple edge="end" onClick={() => handleCancel('quantity')} size="small">
                      <HighlightOffIcon fontSize="small" sx={{
                        color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
                      }} />
                    </IconButton>
                  )}
                  <Stack display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                    <img src={usdticon} alt='usdticon' width={18} />
                  </Stack>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                  >
                    USDT
                  </Typography>
                </Stack>
              </InputAdornment>
            } />
          <OutlinedInput
            id="Userid"
            type="Userid"
            name="Userid"
            placeholder="Search UserID"
            value={useridSearchQuery}
            onChange={(e) => setUseridSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              // Allow only numeric values (0-9), Backspace, and Enter
              const isValidKey = /^[0-9\b\r]+$/.test(e.key);
              if (!isValidKey) {
                e.preventDefault();
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <Stack direction='row' alignItems='center' spacing={.8}>
                  {useridSearchQuery && (
                    <IconButton disableRipple edge="end" onClick={() => handleCancel('userid')} size="small">
                      <HighlightOffIcon fontSize="small" sx={{
                        color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
                      }} />
                    </IconButton>
                  )}
                  <img src={usericon} alt='usericon' width={28} />
                </Stack>
              </InputAdornment>
            }
          />
        </Stack>
      </>
    )
  }
  return (
    <Card
      sx={{
        border: 'none',
        width: '100%',
        borderRadius: { xs: '0', sm: '0', md: '56px 56px 0 0', lg: '56px 56px 0 0' },
        boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
      }}
    >
      <Box
        pt={{ xs: 2, sm: 2, md: 3, lg: 3 }}
        pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
        pl={{ xs: 2, sm: 2, md: 6, lg: 15 }}
        pr={{ xs: 2, sm: 2, md: 6, lg: 15 }}
        md={12} lg={12}
        sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground' }}
      >
        <Grid
          display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
          pb={{ xs: 3, sm: 3, md: 3, lg: 3 }}>
          <Typography sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} variant="h1">
            Peer to Peer (P2P)
          </Typography>
        </Grid>

        <TabContext value={value}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row">
              <TabList onChange={handleChange} indicatorColor="none" textColor='inherit'>
                <Tab
                  disableRipple
                  sx={{
                    fontSize: value === '0' ? '14px' : '14px',
                    fontWeight: value === '0' ? '500' : '500',
                    color: value === '0' ? theme.palette.mode === 'dark' ? 'white' : 'white' : theme.palette.mode === 'dark' ? 'white' : 'black',
                    backgroundColor: value === '0' ? theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' : theme.palette.mode === 'dark' ? '#262b39' : '#F1F1F1',
                    borderRadius: '5px  0 0 5px',
                    minHeight: '40px',
                  }}
                  label={
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      Buy
                    </div>
                  }
                  value="0"
                />
                <Tab
                  disableRipple
                  sx={{
                    fontSize: value === '1' ? '14px' : '14px',
                    fontWeight: value === '1' ? '500' : '500',
                    color: value === '1' ? theme.palette.mode === 'dark' ? 'white' : 'white' : theme.palette.mode === 'dark' ? 'white' : 'black',
                    backgroundColor: value === '1' ? theme.palette.mode === 'dark' ? 'text.sell' : 'text.sell' : theme.palette.mode === 'dark' ? '#262b39' : '#F1F1F1',
                    borderRadius: '0 5px 5px 0',
                    minHeight: '40px',
                  }}
                  label={
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      Sell
                    </div>
                  }
                  value="1"
                />
              </TabList>
              <Typography
                variant="body1"
                pl={2}
                pt={1.5}
                color="text.buy"
                sx={{
                  textDecoration: 'underline',
                  textDecorationColor: 'text.buy',
                  textDecorationThickness: '2px',
                  textUnderlineOffset: '8px'
                }}
              >
                USDT
              </Typography>
            </Stack>
            {/* Table heads */}
            <Tablehead isAuthorised={isAuthorised} />
          </Stack>

          <Stack pt={3} direction='row' spacing={3} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
            <FilterField />
          </Stack>

          <Stack pt={3} pb={1} direction='row' spacing={3} display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}>
            <Button disableRipple onClick={() => DrawerOpen()} variant="filterbutton">
              <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                <FilterAltOutlinedIcon sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} />
                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                  Filter
                </Typography>
                {isIconUp ? <ArrowDropUpIcon sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} /> : <ArrowDropDownIcon sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.secondary' }} />}
              </Stack>
            </Button>
          </Stack>
          <TabPanel value="0" sx={{ padding: '0', paddingTop: '12px' }} >
            <P2pbuyordertab
              isAuthorised={isAuthorised}
              pairInfo={P2PData.pairInfo}
              orderBook={P2PData.orderBook}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
              priceSearchQuery={priceSearchQuery}
              quantitySearchQuery={quantitySearchQuery}
              useridSearchQuery={useridSearchQuery}
            />
          </TabPanel>

          <TabPanel value="1" sx={{ padding: '0', paddingTop: '12px' }}>
            <P2psellordertab
              isAuthorised={isAuthorised}
              pfStatus={P2PData.pfStatus}
              pairInfo={P2PData.pairInfo}
              orderBook={P2PData.orderBook}
              walletInfo={P2PData.walletInfo}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
              priceSearchQuery={priceSearchQuery}
              quantitySearchQuery={quantitySearchQuery}
              useridSearchQuery={useridSearchQuery}
            />
          </TabPanel>
        </TabContext>
      </Box>
      <Drawer open={openDrawer} onClose={handleCloseDrawer} anchor="bottom"
        PaperProps={{
          style: {
            borderRadius: '15px 15px 0px 0px',
          },
        }}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            bgcolor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
            padding: '16px',
          }}
        >
          <Stack p={0.5}>
            <Stack pb={2} direction='row' spacing={0.5} justifyContent="space-between">
              <Typography
                variant='body1'
                sx={{
                  color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                }}>
                Filter
              </Typography>
              <CloseIcon fontSize="small" onClick={handleCloseDrawer} sx={{
                color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
              }} />
            </Stack>
            <Stack >
              <FilterField />
            </Stack>
            <Stack direction='row' spacing={1} pt={2} >
              <Button variant='spotsellbutton' onClick={ResetButton}>
                Reset
              </Button>
              <Button variant='spotbuybutton' onClick={handleCloseDrawer}>
                Apply
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Drawer >
    </Card>
  );
};

export default P2P_Table;
