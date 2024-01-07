import { Button, Card, CircularProgress, Dialog, Divider, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import Norecordfoundcomponents from 'src/new_pages/components-overview/Walletpage/_Essentials/NoRecordFound';
import warninggif from '../../../../../assets/images/gravitusimage/warninggif.svg';
import React, { useState, useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { getConfig_sp } from 'src/utils_ng/localStorage_ng';
import { Spot_CancelOrder_URL, postDataSPOT } from 'src/api_ng/spotTrade_ng';
import { socket } from 'src/socket';

const MyOrders_Mblview = ({ isAuthorised, platformId,
  orderTableData, setSnackbarOpen, setSnackbarMessage }) => {
  const theme = useTheme();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleclick = (order) => {
    setIsLoading(true);
    var postData = { id: order.id, platformId: order.platformId };

    postDataSPOT(Spot_CancelOrder_URL(), postData).then(function (res) {
      setIsLoading(false);
      handleCloseDialog();
      if (res.error !== 'ok') {
        if (res.error.name == "Missing Authorization") {
          // Logout User
        }
        else if (res.error.name == "Invalid Authorization") {
          // Logout User
        }
        else {
          if (res.error.name != undefined) {
            setSnackbarMessage({ msg: res.error.name, success: false });
            setSnackbarOpen(true);
          }
          else {
            setSnackbarMessage({ msg: res.error, success: false });
            setSnackbarOpen(true);
          }
        }
      } else {
        // Set timeout for future usecase
        // setSnackbarMessage({ msg: 'Refresh Now', success: false });
        // setSnackbarOpen(true);

        // Logic moved to sock update
      }
    }, function (err) {
      setSnackbarMessage({ msg: err, success: false });
      setSnackbarOpen(true);
      // Logout User
    });
  }

  useEffect(() => {
    let SPOTOrderEvt = '/SPOTOrder_' + getConfig_sp().userId + '/POST';
    socket.on(SPOTOrderEvt, function (res) {

      if (parseInt(res.platformId) === parseInt(platformId)) {
        if (res.action == 'cancelSuccess' && res.userId == getConfig_sp().userId) {
          mutate(Spot_PreTrade_URL);
          setSnackbarMessage({ msg: res.message, success: false });
          setSnackbarOpen(true);
        }
        else if (res.action == 'cancelError' && res.userId == getConfig_sp().userId) {
          mutate(Spot_PreTrade_URL);
          setSnackbarMessage({ msg: res.message, success: false });
          setSnackbarOpen(true);
        }
      }
    });

    return () => {
      let SPOTOrderEvt = '/SPOTOrder_' + getConfig_sp().userId + '/POST';
      socket.off(SPOTOrderEvt);
    };

  }, [platformId]);

  return (
    <>
      {isAuthorised ? (
        <>
          {orderTableData?.ongoing?.length === 0 ? (
            <>
              <Grid p={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Stack direction="row" spacing={1}>
                  <Norecordfoundcomponents
                    description='You have no open orders.' />
                </Stack>
              </Grid>
            </>
          ) : (
            orderTableData?.ongoing.map((row, index) => {
              // const isItemSelected = isSelected(row.Name);
              return (
                <>
                  <Card
                    key={index}
                    sx={{
                      backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard',
                      boxShadow: 'none',
                    }}>
                    <Stack spacing={1} sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard', }}>
                      <Stack p={0.5} direction="row" spacing={2} justifyContent="space-between">

                        <Grid xs={6} direction="row" spacing={2}  >
                          <Stack pr={2} direction="row" spacing={2} justifyContent="space-between">
                            <Stack spacing={1} direction="row" justifyContent="start"  >
                              <Stack spacing={1} >
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  Type
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                  <Typography variant="subtitle1" sx={{ color: row.side === 'BUY' ? 'text.buy' : 'text.sell' }}>
                                    {row.side}
                                  </Typography>
                                  <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                                    / {row.orderType}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Stack>

                            <Stack spacing={1} textAlign='end' justifyContent='end'>
                              <Stack spacing={1}>
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  Price
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  {row.price}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Grid>

                        <Grid xs={6} direction="row" spacing={2}   >
                          <Stack pl={2} direction="row" spacing={2} justifyContent="space-between">
                            <Stack spacing={1} direction="row" justifyContent="start" >
                              <Stack spacing={1}>
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  Stop Price
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  {row.sPrice === 0 ? '--' : row.sPrice}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Stack spacing={1} textAlign='end' justifyContent='end'>
                              <Stack spacing={1}>
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  Date
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  {new Date(Number(row.time)).toLocaleString('en-IN', {
                                    timeZone: 'Asia/Kolkata',
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                  })}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Grid>

                      </Stack>

                      <Stack p={0.5} direction="row" spacing={2} justifyContent="space-between">

                        <Grid xs={6} direction="row" spacing={2}  >
                          <Stack pr={2} direction="row" spacing={2} justifyContent="space-between">
                            <Stack spacing={1} direction="row" justifyContent="start"  >
                              <Stack spacing={1} >
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  Quantity
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  {row.quantity}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Stack spacing={1} textAlign='end' justifyContent='end'>
                              <Stack spacing={1}>
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  Amount
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  {row.amount}
                                </Typography>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Grid>

                        <Grid xs={6} direction="row" spacing={2}>
                          <Stack pl={2} direction="row" spacing={2} justifyContent="space-between">
                            <Stack spacing={1} direction="row" justifyContent="start" >
                              <Stack spacing={1}>
                                <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                                  After Chrgs
                                </Typography>
                                <Typography
                                  variant="subtitle1"
                                  sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                                >
                                  {row.afterChrgs}
                                </Typography>
                              </Stack>
                            </Stack>

                            <Stack spacing={1} textAlign='end' justifyContent='end'>
                              <Stack spacing={1}>
                                <Button variant='spotmblcancelbutton' onClick={() => handleOpenDialog(row)}>
                                  Cancel
                                </Button>

                              </Stack>

                            </Stack>
                          </Stack>
                        </Grid>
                      </Stack>
                    </Stack>
                  </Card>
                  <Stack pt={1} pb={1}>
                    <Divider></Divider>
                  </Stack>

                </>
              )
            })
          )}

        </>
      ) : (
        <>
          <Grid p={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack direction="row" spacing={1}>
              <Link color="text.buy" variant="title2" component={RouterLink} to="/login">
                login
              </Link>
              <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                or
              </Typography>
              <Link color="text.buy" variant="title2" component={RouterLink} to="/register">
                Register
              </Link>
              <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                Now to Trade
              </Typography>
            </Stack>
          </Grid>
        </>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog} background='transparent'>
        <Stack p={3} spacing={1} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: theme.palette.mode === 'dark' ? '#131722' : 'text.cardbackground' }}>
          <img src={warninggif} alt='warninggif' />
          <Typography variant='h1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Confirm ?
          </Typography>
          <Typography textAlign='center' variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
            Are you sure you did like to cancel your order?
          </Typography>

          <Stack pt={3} direction="row" spacing={2} justifyContent="space-between">
            <Button variant="contained5" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button variant='contained4' onClick={() => handleclick(selectedRow)}>
              {isLoading ? <CircularProgress color="inherit" size={30} /> : 'Confirm'}
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </>
  )
}

export default MyOrders_Mblview;
