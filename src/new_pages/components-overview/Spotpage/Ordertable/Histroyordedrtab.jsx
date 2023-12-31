import React from 'react';
import PropTypes from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';
 
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
  Grid
} from '@mui/material';
import Norecordfoundcomponents from '../../Walletpage/Norecordfoundcomponents';
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
function createData(Type, Price, StopPrice, Quantity, TotalAmount, AfterFees, Date, Status) {
  return { Type, Price, StopPrice, Quantity, TotalAmount, AfterFees, Date, Status };
}
const rows = [
  createData('BTC/USDT', '26,568.00', '26,568.00', '0.01253', '26.62425', '26,568.9', '26 Dec, 12PM', 'Completed'),
  createData('BTC/USDT', '26,568.00', '26,568.00', '0.01253', '26.62425', '--', '26 Dec, 12PM', 'Completed')
];
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
    align: 'right',
    disablePadding: false,
    label: 'Status'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  const theme = useTheme();
  return (
    <TableHead>
      <TableRow style={{ position: 'sticky', top: 0, background: theme.palette.mode === 'dark' ? '#121212' : '#fff' }}>
        {headCells.map((headCell) => (

          <TableCell
            padding='none'
            sx={{ border: 'none', padding: '12px', paddingBottom: '7px', paddingTop: '0px' }}
            key={headCell.id}
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

export default function HistroyordersTab({ isAuthorised, orderTableData, priceData }) {
  const theme = useTheme();
  return (
    <>
      {isAuthorised ? (
        <Box>
          {orderTableData.history.length ? (
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
              }}
            >
              <Table aria-label="sticky table">
                <OrderTableHead />

                <TableBody>
                  {orderTableData.history.map((row, index) => {
                    // const isItemSelected = isSelected(row.Name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        // hover
                        role="checkbox"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '52px' }}
                        tabIndex={-1}
                        key={row.Price}
                      >
                        <TableCell
                          sx={{ border: 'none', paddingBottom: '7px', paddingTop: '0px' }}
                          component="th"
                          id={labelId}
                          scope="row"
                          align="left"
                        >
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="subtitle1" sx={{ color: row.side === 'BUY' ? 'text.buy' : 'text.sell' }}>
                              {row.side}
                              {/* {priceData.tradePair} */}
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
                            {row.sPrice}
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
                            {new Date(Number(row.time)).toLocaleString()}
                          </Typography>
                        </TableCell>

                        <TableCell sx={{ border: 'none', paddingBottom: '7px', paddingTop: '0px' }} align="right">
                          <Typography
                            variant="subtitle1"
                            sx={{  color: row.status === '2' ? 'text.buy' : 'text.sell'  }}
                          >
                          {row.status === '2' ? 'Completed' : 'Cancelled'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
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
                description=' You have no order histroy.' />
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
