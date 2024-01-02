import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Typography, Stack, useTheme } from '@mui/material';

import Norecordfoundcomponents from '../_Essentials/NoRecordFound';

import PropTypes from 'prop-types';
import React from 'react';

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
      <TableRow style={{ position: 'sticky', top: '0', background: theme.palette.mode === 'dark' ? '#131722' : '#fff' }}>
        {headCells.map((headCell, index) => (
          <TableCell
            sx={{ border: 'none' }}
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

export default function HistoryInternalTab({ tableData }) {
  // console.log('tableDataddd', tableData)
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
          height: '680px',
          // minHeight: { xs: 'calc(107vh - 134px)', md: 'calc(10vh - 112px)' },
          '&::-webkit-scrollbar': {
            width: '0px ', // Width of the scrollbar
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
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '64px' }}
                    tabIndex={-1}
                    key={index}>
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
                        {new Date(Number(timeStamp)).toLocaleString('en-IN', {
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
                  </TableRow>
                );
              }))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
