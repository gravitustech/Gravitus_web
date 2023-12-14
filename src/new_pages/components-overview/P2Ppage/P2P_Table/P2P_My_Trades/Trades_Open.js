import React from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, Link, useTheme } from '@mui/material';
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
    id: 'Amount',
    align: 'left',
    disablePadding: false,
    label: 'Amount'
  },
  {
    id: 'Quantity',
    align: 'left',
    disablePadding: false,
    label: 'Quantity'
  },
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
    id: 'Date',
    align: 'left',
    disablePadding: false,
    label: 'Date'
  },
  {
    id: 'Status',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'Action',
    align: 'right',
    disablePadding: false,
    label: 'Action'
  },
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

export default function OpenTradesTab({ trades, pairInfo }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const ongoing = trades?.ongoing;

  const handleclick = (myTradeDetails) => {
    if (myTradeDetails.side === 'BUY') {
      navigate('/Buyer_Trade_Dts', { state: myTradeDetails });
    } else if (myTradeDetails.side === 'SELL') {
      navigate('/Seller_Trade_Dts', { state: myTradeDetails });
    }
  }

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
            '& .MuiTableCell-root:nth-child(2), & .MuiTableCell-root:nth-child(3), ': {
              pl: 7
            },
            '& .MuiTableCell-root:nth-child(4),& .MuiTableCell-root:nth-child(5)': {
              pl: 5
            },
            ',& .MuiTableCell-root:nth-child(6)': {
              pl: 12
            },
          }}
        >
          <OrderTableHead />
          <TableBody>
            {ongoing?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none', }}>
                  <Norecordfoundcomponents
                    description='No Record Found' />
                </TableCell>
              </TableRow>
            ) : (
              ongoing?.map((row, index) => {
                // const isItemSelected = isSelected(row.Name);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    // hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '64px', }}
                    tabIndex={-1}
                    key={row.side}>
                    <TableCell sx={{ border: 'none' }} component="th" id={labelId} scope="row" align="left">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant='body1' sx={{ color: row.side === 'BUY' ? 'text.buy' : 'text.sell' }}>
                          {row.side}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.price} {pairInfo.sellPair}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.quantity} {pairInfo.buyPair}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.amount} {pairInfo.sellPair}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {row.tds === 0 ? '--' : row.tds.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 })}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {/* {new Date(Number(row.time)).toLocaleString()} */}
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

                    <TableCell sx={{ border: 'none', color: 'text.buy' }} align="left">
                      <Typography variant='body1' >
                        {row.status}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="right">
                      <Link
                        variant='body1'
                        sx={{ textDecorationColor: 'text.buy', cursor: 'pointer' }}
                        color="text.buy"
                        onClick={() => handleclick(row)}
                      >
                        View
                      </Link>
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
