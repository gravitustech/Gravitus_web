import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, useTheme } from '@mui/material';

import Norecordfoundcomponents from 'src/new_pages/components-overview/Walletpage/Norecordfoundcomponents';

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
              orders?.history?.map((row, index) => {
                // const isItemSelected = isSelected(row.Name);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    //  hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '64px', }}
                    tabIndex={-1}
                    key={row.side}>
                    <TableCell sx={{ border: 'none', paddingTop: '0' }} component="th" id={labelId} scope="row" align="left">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant='body1' sx={{ color: row.side === 'BUY' ? 'text.buy' : 'text.sell' }}>
                          {row.side}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Stack spacing={.5}>
                        <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {row.price} {pairInfo.sellPair}
                        </Typography>
                        <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {row.quantity} {pairInfo.buyPair}
                        </Typography>
                      </Stack>
                    </TableCell>


                    <TableCell sx={{ border: 'none', paddingTop: '0' }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.amount} {pairInfo.sellPair}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', paddingTop: '0', paddingRight: '0px' }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.tds.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 })}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', paddingLeft: '0px' }} align="right">
                      <Stack spacing={.5} >
                        <Typography variant='body1' sx={{
                          color: row.status === 'Matched' ?
                            theme.palette.mode === 'dark' ? 'text.buy' : 'text.buy' :
                            theme.palette.mode === 'dark' ? 'text.sell' : 'text.sell'
                        }} >
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
                      </Stack>
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
