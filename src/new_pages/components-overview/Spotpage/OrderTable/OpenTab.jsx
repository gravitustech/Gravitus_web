import warninggif from '../../../../assets/images/gravitusimage/warninggif.svg';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { socket } from '../../../../socket';
import useSWR, { mutate } from 'swr';

import { Spot_PreTrade_URL, fetcherSPOT } from 'src/api_ng/spotTrade_ng';
import { getConfig_ng, getConfig_sp, setConfig_ng } from '../../../../utils_ng/localStorage_ng';

// material-ui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Link,
  useTheme,
  Divider,
  Grid,
  Dialog,
  Button
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import Norecordfoundcomponents from '../../Walletpage/Norecordfoundcomponents';
import { Spot_CancelOrder_URL, postDataSPOT } from 'src/api_ng/spotTrade_ng';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'Type',
    align: 'left',
    disablePadding: true,
    label: 'Type'
  },
  {
    id: 'Price',
    align: 'left',
    disablePadding: false,
    label: 'Price'
  },
  {
    id: 'StopPrice',
    align: 'left',
    disablePadding: false,
    label: 'Stop Price'
  },
  {
    id: 'Quantity',
    align: 'left',
    disablePadding: false,
    label: 'Quantity'
  },
  {
    id: 'Total Amount',
    align: 'left',
    disablePadding: false,
    label: 'Total Amount'
  },
  {
    id: 'AfterFees',
    align: 'left',
    disablePadding: false,
    label: 'After Fees'
  },
  {
    id: 'Date',
    align: 'left',
    disablePadding: false,
    label: 'Date'
  },
  {
    id: 'Status',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'Action',
    align: 'right',
    disablePadding: false,
    label: 'Action'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  const theme = useTheme();
  return (
    <TableHead>
      <TableRow style={{ position: 'sticky', top: '0', background: theme.palette.mode === 'dark' ? '#121212' : '#fff' }}>
        {headCells.map((headCell, index) => (
          <TableCell
            padding='none'
            sx={{ border: 'none', padding: '12px', paddingBottom: '7px', paddingTop: '0px' }}
            key={index}
            align={headCell.align}
          >
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              {headCell.label}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //

export default function OpenTab({ isAuthorised, platformId, orderTableData, setSnackbarOpen, setSnackbarMessage }) {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleclick = (order) => {
    var postData = { id: order.id, platformId: order.platformId };

    postDataSPOT(Spot_CancelOrder_URL(), postData).then(function (res) {
      // console.log(res);
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

      console.log(res, 'Response from Sock Cancel');
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
        <Box>
          {orderTableData?.ongoing?.length ? (
            <TableContainer varaint="tablecontainer"
              sx={{
                overflowY: 'scroll',
                /* Custom scrollbar styles */
                scrollbarWidth: 'thin',
                scrollbarColor: 'gray lightgray',
                height: '240px',
                '&::-webkit-scrollbar': {
                  width: '4px', // Width of the scrollbar
                },
                '&::-webkit-scrollbar-track': {
                  background: theme.palette.mode === "dark" ? 'transparent' : "transparent", // Track color
                },
                '&::-webkit-scrollbar-thumb': {
                  background: theme.palette.mode === "dark" ? 'gray' : "lightgray",
                  borderRadius: '8px', // Round the corners of the thumb
                },
              }}>
              <Table aria-label="sticky table">
                <OrderTableHead />

                <TableBody>
                  {orderTableData?.ongoing.map((row, index) => {
                    // const isItemSelected = isSelected(row.Name);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        role="checkbox"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '52px' }}
                        tabIndex={-1}
                        key={index}
                      >
                        <TableCell
                          sx={{ border: 'none', paddingBottom: '7px', paddingTop: '0px' }}
                          component="th"
                          id={labelId}
                          scope="row"
                          align="left"
                        >
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Typography variant="subtitle1" sx={{ color: row.side === 'BUY' ? 'text.buy' : 'text.sell' }}>
                              {row.side}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                              / {row.orderType}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell sx={{ border: 'none', paddingBottom: '7px', paddingTop: '0px' }} align="left">
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            {row.price}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ border: 'none', paddingBottom: '7px', paddingTop: '0px' }} align="left">
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            {row.sPrice === 0 ? '--' : row.sPrice}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ border: 'none', paddingBottom: '7px', paddingTop: '0px' }} align="left">
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            {row.quantity}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ border: 'none', paddingBottom: '7px', paddingTop: '0px' }} align="left">
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            {row.amount}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ border: 'none', paddingBottom: '7px', paddingTop: '0px' }} align="left">
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            {row.afterChrgs}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ border: 'none', paddingBottom: '7px', paddingTop: '0px' }} align="left">
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
                        </TableCell>

                        <TableCell sx={{ border: 'none', paddingBottom: '7px', paddingTop: '0px' }} align="left">
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                          >
                            {row.status}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ border: 'none', paddingBottom: '7px', paddingTop: '0px', cursor: 'pointer' }} align="right">
                          <Link
                            variant="subtitle1"
                            sx={{ textDecorationColor: 'text.sell' }}
                            color="text.sell"
                            onClick={() => handleOpenDialog(row)}
                          >
                            Cancel
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>

                <Dialog open={openDialog} onClose={handleCloseDialog} >
                  <Stack p={3} spacing={1} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                        Confirm
                      </Button>
                    </Stack>

                  </Stack>
                </Dialog>
              </Table>
            </TableContainer>
          ) : (
            <>
              <TableContainer varaint="tablecontainer">
                <Table aria-labelledby="tableTitle">
                  <OrderTableHead />
                </Table>
              </TableContainer>
              <Norecordfoundcomponents
                description=' You have no open orders.' />
            </>
          )}
        </Box>
      ) : (
        <>
          <Grid p={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
    </>
  );
}
