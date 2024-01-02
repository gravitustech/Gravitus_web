import { Button, Card, Drawer, Paper, Stack, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import BuySellGrid_Mobileview from './Buy_Sell_Grid_mbl';

const Buy_Sell_Mobileview = ({ isAuthorised, platformId, pairData, priceData, selectedOrder,
  setSelectedOrder, walletData, setSnackbarOpen, setSnackbarMessage }) => {
  const theme = useTheme();

  const [state, setState] = React.useState({
    bottom: false,
  });

  const [orderSide, setOrderSide] = useState('1');

  const toggleDrawer = (anchor, open, orderSide) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open, orderSide });

    // Set the order side when the drawer is opened
    if (open) {
      setOrderSide(orderSide);
    }
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={0}
    >
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Stack direction='row' spacing={1} p={2}>
            <Button variant="spotbuybutton" onClick={toggleDrawer(anchor, true, '1')} >
              BUY
            </Button>
            <Button variant="spotsellbutton" onClick={toggleDrawer(anchor, true, '2')} >
              SELL
            </Button>
          </Stack>
          <Drawer
            backgroundColor='transparent'
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            PaperProps={{
              style: {
                borderRadius: '15px 15px 0px 0px',
              },
            }}
          >
            <Card
              sx={{
                // height: '483px',
                display: 'flex',
                flexDirection: 'column',
                bgcolor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
                padding: '16px',
              }}
            >
              <Stack p={1}>
                <Stack pb={3} direction='row' spacing={0.5} justifyContent="space-between">
                  <Typography
                    variant='body1'
                    sx={{
                      color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                    }}>
                    Spot
                  </Typography>
                  <CloseIcon fontSize="small" onClick={toggleDrawer(anchor, false)} sx={{
                    color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
                  }} />
                </Stack>
                <BuySellGrid_Mobileview
                  isAuthorised={isAuthorised}
                  platformId={platformId}
                  priceData={priceData}
                  pairData={pairData}
                  walletData={walletData}
                  selectedOrder={selectedOrder}
                  setSelectedOrder={setSelectedOrder}
                  setSnackbarOpen={setSnackbarOpen}
                  setSnackbarMessage={setSnackbarMessage}
                  setOrderSide={setOrderSide} 
                  orderSide={orderSide}
                />
              </Stack>
            </Card>
          </Drawer>
        </React.Fragment>
      ))}
    </Paper>
  )
}

export default Buy_Sell_Mobileview;
