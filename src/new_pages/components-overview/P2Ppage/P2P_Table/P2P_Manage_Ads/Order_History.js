import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, useTheme } from '@mui/material';
import Norecordfoundcomponents from 'src/new_pages/components-overview/Walletpage/_Essentials/NoRecordFound';


// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'Type',
    align: 'left',
    disablePadding: true,
    label: 'Type'
  },
  {
    id: 'Amount / Quantity',
    align: 'left',
    disablePadding: false,
    label: 'Amount  / Quantity'
  },
  // {
  //   id: 'Quantity',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'Quantity'
  // },
  {
    id: 'Total Amount',
    align: 'left',
    disablePadding: false,
    label: 'Total Amount'
  },
  {
    id: 'TDS',
    align: 'left',
    disablePadding: false,
    label: 'TDS'
  },
  {
    id: 'Status / Date',
    align: 'right',
    disablePadding: false,
    label: 'Status / Date'
  },
  // {
  //   id: 'Status',
  //   align: 'right',
  //   disablePadding: false,
  //   label: 'Status'
  // },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  const theme = useTheme();
  return (
    <TableHead>
      <TableRow style={{ position: 'sticky', top: '0', background: theme.palette.mode === 'dark' ? '#131722' : '#fff' }}>
        {headCells.map((headCell, index) => (
          <TableCell
            sx={{ border: 'none', paddingTop: '4px' }}
            key={index}
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

export default function HistroyTab({ orders, pairInfo }) {
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
          height: '480px',
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
        <Table aria-labelledby="tableTitle" >
          <OrderTableHead />
          <TableBody>
            {orders?.history?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none', }}>
                  <Norecordfoundcomponents
                    description='No Record Found' />
                </TableCell>
              </TableRow>
            ) : (
              orders?.history?.map((item, index) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '64px', }}
                  tabIndex={-1}
                  key={index}>
                  <TableCell sx={{ border: 'none', paddingTop: '0' }} component="th" scope="row" align="left">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant='body1' sx={{ color: item.side === 'BUY' ? 'text.buy' : 'text.sell' }}>
                        {item.side}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell sx={{ border: 'none' }} align="left">
                    <Stack spacing={.5}>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {item.price} {pairInfo.sellPair}
                      </Typography>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {item.quantity} {pairInfo.buyPair}
                      </Typography>
                    </Stack>
                  </TableCell>


                  <TableCell sx={{ border: 'none', paddingTop: '0' }} align="left">
                    <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {item.amount} {pairInfo.sellPair}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ border: 'none', paddingTop: '0', paddingRight: '0px' }} align="left">
                    <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {item.tds === 0 ? '--' : item.tds.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 })}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ border: 'none', paddingLeft: '0px' }} align="right">
                    <Stack spacing={.5} >
                      <Typography variant='body1' sx={{
                        color: item.status === 'Matched' ?
                          theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' :
                          theme.palette.mode === 'dark' ? 'text.sell' : 'text.sell'
                      }} >
                        {item.status}
                      </Typography>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                        {/* {new Date(Number(item.time)).toLocaleString()} */}
                        {new Date(Number(item.time)).toLocaleString('en-IN', {
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
                  </TableCell>

                </TableRow>
              )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
