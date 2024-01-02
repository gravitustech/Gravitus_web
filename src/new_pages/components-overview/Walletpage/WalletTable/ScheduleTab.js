import React from 'react';
import PropTypes from 'prop-types';

import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, Stack, useTheme
} from '@mui/material';

import NoRecordFound from '../_Essentials/NoRecordFound';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'transType',
    align: 'left',
    disablePadding: true,
    label: 'Type',
  },
  {
    id: 'amount',
    align: 'left',
    disablePadding: true,
    label: 'Amount'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: true,
    label: 'Status'
  },
  {
    id: 'timeStamp',
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

export default function ScheduleTab({ scheduleData }) {
  const theme = useTheme();
  return (
    <Box
    >
      <TableContainer
        variant='tablecontainer'
        sx={{
          width: '100%',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
          overflowY: 'scroll',
          /* Custom scrollbar styles */
          scrollbarWidth: 'thin',
          scrollbarColor: 'gray lightgray',
          height: '462px',
          '&::-webkit-scrollbar': {
            width: '0px', // Width of the scrollbar
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.mode === "dark" ? 'transparent' : "transparent", // Track color
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === "dark" ? '#262B39' : "lightgray",
            borderRadius: '8px', // Round the corners of the thumb
          },
        }}
      >
        <Table
          aria-labelledby="tableTitle"
        >
          <OrderTableHead />
          <TableBody>
            {scheduleData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none', }}>
                  <NoRecordFound
                    description='No Record Found' />
                </TableCell>
              </TableRow>
            ) : (
              scheduleData?.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    tabIndex={-1}
                    key={index}
                  >
                    <TableCell sx={{ border: 'none' }} component="th" id={labelId} scope="row" align="left">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {row.transType}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.amount} {row.crypto}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.status}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', }} align="right">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
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
