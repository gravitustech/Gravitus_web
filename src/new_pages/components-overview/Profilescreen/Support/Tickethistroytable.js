import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Stack, useTheme
} from '@mui/material';

import Norecordfoundcomponents from '../../Walletpage/_Essentials/NoRecordFound';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

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
      <TableRow style={{ position: 'sticky', top: '0', background: theme.palette.mode === 'dark' ? '#131722' : '#FFFFFF' }}>
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

  const reversedhistoryData = historyData && [...historyData].reverse();
  return (
    <Box>
      <TableContainer variant="tablecontainer"
        sx={{
          height: '465px',
          /* Custom scrollbar styles */
          scrollbarWidth: 'thin',
          scrollbarColor: 'gray lightgray',

          '&::-webkit-scrollbar': {
            width: '0px', // Width of the scrollbar
            height: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.mode === "dark" ? 'transparent' : "transparent",// Track color
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === 'dark' ? '#0F121A' : 'lightgray',
            borderRadius: '8px' // Round the corners of the thumb
          }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead />
          <TableBody>
            {historyData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none', }}>
                  <Norecordfoundcomponents
                    description='You have no ticket histroy' />
                </TableCell>
              </TableRow>
            ) : (
              reversedhistoryData.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    // hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    tabIndex={-1}
                    key={index}
                  >
                    <TableCell sx={{ border: 'none', paddingLeft: '0', paddingRight: '128px' }} component="th" id={labelId} scope="row" align="left">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {row.category}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ border: 'none', paddingLeft: '0', paddingRight: '108px' }} align="left">
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.allMessages[0].correspondence}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', paddingLeft: '0', paddingRight: '128px' }} align="left">
                      <Typography variant="body1" color="text.buy">
                        {row.status === '0' ? 'opened' : 'closed'}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', paddingRight: '0' }} align="right">
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
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
