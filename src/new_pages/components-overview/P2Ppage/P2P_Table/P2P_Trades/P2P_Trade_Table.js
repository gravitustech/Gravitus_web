import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, useTheme } from '@mui/material';
import Norecordfoundcomponents from 'src/new_pages/components-overview/Walletpage/_Essentials/NoRecordFound';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'Time',
    align: 'left',
    disablePadding: true,
    label: 'Time'
  },
  {
    id: 'Price',
    align: 'left',
    disablePadding: false,
    label: 'Price'
  },
  {
    id: 'Quantity',
    align: 'right',
    disablePadding: false,
    label: 'Quantity'
  },
  {
    id: 'TotalAmount',
    align: 'right',
    disablePadding: false,
    label: 'Total Amount'
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  const theme = useTheme();
  return (
    <TableHead>
      <TableRow style={{ position: 'sticky', top: '0', background: theme.palette.mode === 'dark' ? '#131722' : '#fff' }}>
        {headCells.map((headCell, index) => (
          <TableCell
            sx={{ border: 'none' }}
            key={index}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
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

export default function P2PTradeTable({ orderInfo }) {
  const theme = useTheme();
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
          height: '564px',
          '&::-webkit-scrollbar': {
            width: '0px', // Width of the scrollbar
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.mode === "dark" ? 'transparent' : "transparent", // Track color
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === "dark" ? '#0F121A' : "lightgray",
            borderRadius: '8px', // Round the corners of the thumb
          },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
        >
          <OrderTableHead />
          <TableBody>
            {orderInfo?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none', }}>
                  <Norecordfoundcomponents
                    description='No Record Found' />
                </TableCell>
              </TableRow>
            ) : (
              orderInfo?.map((row, index) => {
                // const isItemSelected = isSelected(row.Name);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '64px', }}
                    tabIndex={-1}
                    key={index}>
                    <TableCell sx={{ border: 'none' }} component="th" id={labelId} scope="row" align="left">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        {row.timeStamp && !isNaN(Number(row.timeStamp)) ? (
                          <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                            {new Date(Number(row.timeStamp)).toLocaleString('en-IN', {
                              timeZone: 'Asia/Kolkata',
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true
                            })}
                          </Typography>
                        ) : (
                          <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                            --
                          </Typography>
                        )}
                        {/* <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                          {new Date(Number(row.timeStamp)).toLocaleString('en-US', {
                            timeZone: 'Asia/Kolkata',
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </Typography> */}
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        {row.price} INR
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="right">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        {row.quantity} USDT
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="right">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        {row.amount} INR
                      </Typography>
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
