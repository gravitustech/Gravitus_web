import { 
  Box, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Typography, Stack, Link, useTheme 
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

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
  createData('Trade', '0.012BTC', '0.0 BTC', '1A1zP1eP5QGefi2DMpPTfTL5SLmv7DivfNa', '1A1zP1eP5QGefi2DMpPTf...', 'Processed', '26 Dec, 12PM')
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
    id: 'Fees',
    align: 'left',
    disablePadding: true,
    label: 'Fees'
  },
  {
    id: 'Address',
    align: 'left',
    disablePadding: true,
    label: 'Address'
  },
  {
    id: 'Transaction Id',
    align: 'left',
    disablePadding: false,
    label: 'Transaction Id'
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
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            sx={{ border: 'none' }}
            key={index}
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

export default function HistroyTable({ tableData }) {
  const theme = useTheme();

  return (
    <Box>
      <TableContainer varaint="tablecontainer">
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:nth-child(2), & .MuiTableCell-root:nth-child(3), ': {
              pl: 4
            },
            '& .MuiTableCell-root:nth-child(4), & .MuiTableCell-root:nth-child(5), ': {
              pl: 5
            },
            '& .MuiTableCell-root:nth-child(6), & .MuiTableCell-root:nth-child(7), ': {
              pl: 5
            }
          }}
        >
          <OrderTableHead />
          <TableBody>
            {tableData &&
              tableData.map((row, index) => {
                // const isItemSelected = isSelected(row.Name);
                const labelId = `enhanced-table-checkbox-${index}`;
                const { id, transType, amount, transAmount, status, timeStamp } = row;
                return (
                  <TableRow
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '64px' }}
                    tabIndex={-1}
                    key={index}
                  >
                    <TableCell sx={{ border: 'none' }} component="th" id={labelId} scope="row" align="left">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {transType}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ border: 'none' }} component="th" id={labelId} scope="row" align="left">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {amount}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {'-'}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Link
                        variant="body1"
                        sx={{ textDecoration: 'underline', textDecorationColor: 'text.buy' }}
                        color="text.buy"
                        component={RouterLink}
                        to="/"
                      >
                        {'-'}
                      </Link>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Link
                        variant="body1"
                        sx={{ textDecoration: 'underline', textDecorationColor: 'text.buy' }}
                        color="text.buy"
                        component={RouterLink}
                        to="/"
                      >
                        {'-'}
                      </Link>
                    </TableCell>

                    <TableCell sx={{ border: 'none', color: 'text.buy' }} align="left">
                      <Typography variant="body1">{status}</Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="right">
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {new Date(Number(timeStamp)).toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}