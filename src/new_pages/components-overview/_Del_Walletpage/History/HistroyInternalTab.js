import PropTypes from 'prop-types';
// import { useState } from 'react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, Link, useTheme } from '@mui/material';
import Norecordfoundcomponents from '../Norecordfoundcomponents';
// import copyicon from '../images/copyicon.svg'
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
function createData(Type, Amount, Fees, Address, TransactionId, Status, Date) {
  return { Type, Amount, Fees, Address, TransactionId, Status, Date };
}
const rows = [
  createData(
    'Trade',
    '0.012BTC',
    '0.0 BTC',
    '1A1zP1eP5QGefi2DMpPTfTL5SLmv7DivfNa',
    '1A1zP1eP5QGefi2DMpPTf...',
    'Processed',
    '26 Dec, 12PM'
  ),
  createData(
    'Trade',
    '0.012BTC',
    '0.0 BTC',
    '1A1zP1eP5QGefi2DMpPTfTL5SLmv7DivfNa',
    '1A1zP1eP5QGefi2DMpPTf...',
    'Processed',
    '26 Dec, 12PM'
  )
];
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
    disablePadding: true,
    label: 'Amount'
  },
  {
    id: 'TxRef',
    align: 'left',
    disablePadding: true,
    label: 'Tx Ref'
  },
  {
    id: 'Status',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'Date',
    align: 'right',
    disablePadding: false,
    label: 'Date'
  }
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

export default function HistroyInternalTab({ tableData }) {
  console.log('tableDataddd', tableData)
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
            width: '0px ', // Width of the scrollbar
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
          sx={{
            '& .MuiTableCell-root:nth-child(2), & .MuiTableCell-root:nth-child(3),& .MuiTableCell-root:nth-child(4), ': {
              pl: 14
            },
          }}
        >
          <OrderTableHead />
          <TableBody>
            {tableData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none', }}>
                  <Norecordfoundcomponents
                    description='No Record Found' />
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((row, index) => {
                // const isItemSelected = isSelected(row.Name);
                const labelId = `enhanced-table-checkbox-${index}`;
                const { userId, crypto, transType, transDesc, highlight, amount, txRef, status, date, timeStamp } = row;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '64px' }}
                    tabIndex={-1}
                    key={row.Amount}>
                    <TableCell sx={{ border: 'none' }} component="th" id={labelId} scope="row" align="left">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {transType}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ border: 'none' }} component="th" id={labelId} scope="row" align="left">
                      <Stack direction="row" alignItems="center" spacing={1} >
                        <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {amount} {crypto}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left" >
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {txRef}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', color: 'text.buy' }} align="left">
                      <Typography variant='body1'>
                        {status}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', }} align="right">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {new Date(Number(timeStamp)).toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              }))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
