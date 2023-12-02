import React from 'react';
import PropTypes from 'prop-types';
import useSWR, { mutate } from 'swr';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, Link, useTheme } from '@mui/material';

import Norecordfoundcomponents from 'src/new_pages/components-overview/Walletpage/Norecordfoundcomponents';
import { P2P_CancelOrder_URL, P2P_SuperOrders_URL, postDataP2P } from 'src/api_ng/peer2peer_ng';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'Type',
    align: 'left',
    disablePadding: true,
    label: 'Type'
  },
  {
    id: 'Amount',
    align: 'left',
    disablePadding: false,
    label: 'Amount / Quantity'
  },
  // {
  //   id: 'Quantity',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'Quantity'
  // },
  {
    id: 'TDS',
    align: 'left',
    disablePadding: false,
    label: 'TDS'
  },
  {
    id: 'Total Amount',
    align: 'left',
    disablePadding: false,
    label: 'Total Amount'
  },
  {
    id: 'Date',
    align: 'left',
    disablePadding: false,
    label: 'Status / Date'
  },
  // {
  //   id: 'Status',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'Status'
  // },
  {
    id: 'Action',
    align: 'right',
    disablePadding: false,
    label: 'Action'
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  const theme = useTheme();
  return (
    <TableHead>
      <TableRow style={{ position: 'sticky', top: '0', background: theme.palette.mode === 'dark' ? '#000' : '#fff' }}>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ border: 'none' }}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
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

export default function OngoingTab({ orders, pairInfo, setSnackbarOpen, setSnackbarMessage }) {
  const theme = useTheme();

  const handleclick = (order) => {
    var postData = { "id" : order.id, "platformId" : pairInfo?.id };

    postDataP2P(P2P_CancelOrder_URL(), postData).then(function (res) {
      console.log(res);

      if (res.error !== 'ok') {
        if(res.error.name == "Missing Authorization") {
          // Logout User
        }
        else if (res.error.name == "Invalid Authorization") {
          // Logout User
        }
        else {
          if(res.error.name != undefined) {
            setSnackbarMessage({ msg: res.error.name, success: false });
            setSnackbarOpen(true);
          }
          else {
            setSnackbarMessage({ msg: res.error, success: false });
            setSnackbarOpen(true);
          }
        }
      } else {
        mutate(P2P_SuperOrders_URL);
        setSnackbarMessage({ msg: 'Order cancelled successfully', success: false });
        setSnackbarOpen(true);
      }
    }, function (err) {
      console.log(err);
      // Logout User
    });
  }

  return (
    <Box>
      <TableContainer varaint="tablecontainer"
        sx={{
          width: '100%',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
          overflowY: 'scroll',
          /* Custom scrollbar styles */
          scrollbarWidth: 'thin',
          scrollbarColor: 'gray lightgray',
          height: '450px',
          '&::-webkit-scrollbar': {
            width: '0px', // Width of the scrollbar
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.mode === "dark" ? 'black' : "text.background", // Track color
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === "dark" ? 'gray' : "lightgray",
            borderRadius: '8px', // Round the corners of the thumb
          },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
        >
          <OrderTableHead />
          <TableBody>
            {orders?.ongoing?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none', }}>
                  <Norecordfoundcomponents
                    description='No Record Found' />
                </TableCell>
              </TableRow>
            ) : (
              orders?.ongoing?.map((row, index) => {
                // const isItemSelected = isSelected(row.Name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    // hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '64px', }}
                    tabIndex={-1}
                    key={row.side}>
                    <TableCell sx={{ border: 'none', paddingTop: '0' }} component="th" id={labelId} scope="row" align="left">
                      <Typography variant='body1' sx={{ color: row.side === 'BUY' ? 'text.buy' : 'text.sell' }}>
                        {row.side}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.price} {pairInfo.sellPair}
                      </Typography>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.quantity} {pairInfo.buyPair}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', paddingTop: '0' }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.tds.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 })}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', paddingTop: '0' }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.amount} {pairInfo.sellPair}
                      </Typography>
                    </TableCell>

                    <TableCell align="left" sx={{ border: 'none'}}>
                        <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }} >
                          {row.status}
                        </Typography>
                        <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          {/* {new Date(Number(row.time)).toLocaleString()} */}
                          {new Date(Number(row.time)).toLocaleString('en-US', {
                            timeZone: 'Asia/Kolkata',
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', paddingTop: '0' }} align="right">
                      <Link
                        variant='body1'
                        sx={{ textDecorationColor: 'text.sell', cursor: 'pointer' }}
                        color="text.sell"
                        onClick={() => handleclick(row)}
                      >
                        Cancel
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
