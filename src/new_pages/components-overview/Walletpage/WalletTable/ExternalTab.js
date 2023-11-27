import React from 'react';
import PropTypes from 'prop-types';

// import { useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, useTheme } from '@mui/material';
import Norecordfoundcomponents from '../Norecordfoundcomponents';

// import copyicon from '../images/copyicon.svg'

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

function createData(Type, Amount, Status, Date) {
  return { Type, Amount, Status, Date };
}
const rows = [
  createData(
    'Deposit', '193BTC', 'Processed', '26 Dec, 12PM'
  ),
  createData(
    'Deposit', '193BTC', 'Processed', '26 Dec, 12PM'
  ),
];
const headCells = [
  {
    id: 'Type',
    align: 'left',
    disablePadding: true,
    label: 'Type',
  },
  {
    id: 'Amount',
    align: 'left',
    disablePadding: true,
    label: 'Amount'
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
    disablePadding: false,
    label: 'Date'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead() {
  const theme = useTheme();
  return (
    <TableHead>
      <TableRow>
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

export default function ExternalTab() {
  const theme = useTheme();
  return (
    <Box
    >
      <TableContainer
        variant='tablecontainer'
      >
        <Table
          aria-labelledby="tableTitle"
        >
          <OrderTableHead />
          <TableBody>
            {rows.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.Type}
                >
                  <TableCell sx={{ border: 'none' }} component="th" id={labelId} scope="row" align="left">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.Type}
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell sx={{ border: 'none' }} align="left">
                    <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {row.Amount}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ border: 'none', }} align="left">
                    <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {row.Status}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ border: 'none', }} align="right">
                    <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      {row.Date}
                    </Typography>
                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>

      </TableContainer>
      <>
        {/* <TableContainer varaint="tablecontainer">
          <Table aria-labelledby="tableTitle">
            <OrderTableHead />
          </Table>
        </TableContainer>
        <Norecordfoundcomponents
          description='No Record Found' /> */}
      </>
    </Box>
  );
}
