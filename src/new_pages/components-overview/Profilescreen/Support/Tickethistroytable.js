import PropTypes from 'prop-types';
// import { useState } from 'react';
import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, useTheme } from '@mui/material';
import Norecordfoundcomponents from 'src/new_pages/components-overview/Walletpage/Norecordfoundcomponents';
// import copyicon from '../images/copyicon.svg'
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
function createData(Category, Message, Status, Date) {
  return { Category, Message, Status, Date };
}
const rows = [
  createData('Deposit', 'Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt ', 'Opend', '26 Dec'),
  createData('Trades', 'Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt ', 'Opend', '26 Dec'),
  createData('P2P Trades', 'Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt ', 'Opend', '26 Dec'),
  createData('Deposit', 'Lorem ipsum dolor sit amet consectetur. Volutpat ullamcorper amet tincidunt ', 'Opend', '26 Dec')
];
const headCells = [
  {
    id: 'Category',
    align: 'left',
    disablePadding: true,
    label: 'Category'
  },
  {
    id: 'Message',
    align: 'left',
    disablePadding: true,
    label: 'Message'
  },
  {
    id: 'Status',
    align: 'left',
    disablePadding: true,
    label: 'Status'
  },
  {
    id: 'Date',
    align: 'right',
    disablePadding: true,
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
            sx={{ border: 'none', paddingLeft: '0' }}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
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

export default function Tickethistroytab({ historyData }) {
  const theme = useTheme();
  console.log({ historyData });
  return (
    <Box>
      <TableContainer variant="tablecontainer"
        sx={{
          height: '365px',
          /* Custom scrollbar styles */
          scrollbarWidth: 'thin',
          scrollbarColor: 'gray lightgray',

          '&::-webkit-scrollbar': {
            width: '4px', // Width of the scrollbar
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.mode === 'dark' ? 'black' : 'text.white' // Track color
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === 'dark' ? 'lightgray' : 'lightgray',
            borderRadius: '8px' // Round the corners of the thumb
          }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead />
          <TableBody>
            {historyData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none', }}>
                  <Norecordfoundcomponents
                    description='You have no ticket histroy' />
                </TableCell>
              </TableRow>
            ) : (
              historyData.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    // hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    tabIndex={-1}
                    key={index}
                  >
                    <TableCell sx={{ border: 'none', paddingLeft: '0',paddingRight:'128px' }} component="th" id={labelId} scope="row" align="left">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {row.category}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ border: 'none', paddingLeft: '0',paddingRight:'108px'  }} align="left">
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.allMessages[0].correspondence}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', paddingLeft: '0',paddingRight:'128px' }} align="left">
                      <Typography variant="body1" color="text.buy">
                        {row.status === '0' ? 'opened' : 'closed'}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none',paddingRight:'0' }} align="right">
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {new Date(Number(row.timeStamp)).toLocaleString()}
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
