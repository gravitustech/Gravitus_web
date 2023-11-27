import PropTypes from 'prop-types';
// import { useState } from 'react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// material-ui
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, Link, useTheme, } from '@mui/material';
import Norecordfoundcomponents from '../Norecordfoundcomponents';
// import copyicon from '../images/copyicon.svg'
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
function createData(Type, Amount, Fees, Address, TransactionId, Status, Date) {
  return { Type, Amount, Fees, Address, TransactionId, Status, Date };
}
const rows = [
  createData(
    'Deposit',
    '0.012BTC',
    '0.0 BTC',
    '1A1zP1eP5QGefi2DMpPTfTL5SLmv7DivfNa',
    '1A1zP1eP5QGefi2DMpPTf...',
    'Processed',
    '26 Dec, 12PM'
  ),
  createData(
    'Withdraw',
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
const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip arrow placement="top" {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    // boxShadow: theme.shadows[1],
    fontSize: 11
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white, // Set the arrow color to white
  },
}));
const TransactionId = ({ transactionid }) => {
  const first = transactionid.slice(0, 18);
  const end = '.....';
  const TransactionId = `${first} ${end}`;

  return (
    <Typography variant='body1' sx={{ textDecoration: 'underline', textDecorationColor: 'text.buy' }} color='text.buy'>
      {TransactionId}
    </Typography>
  );
};
export default function HistroyExternalTab({ tableData }) {
  console.log('histroytableData', tableData);

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
        <Table aria-labelledby="tableTitle">
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
                const { userId, crypto, transType, transDesc, highlight, amount, charges, address, txId, href, status, date, timeStamp } = row;
                const firstTenCharactersaddress = address.slice(0, 25);
                const restOfCharactersaddress = address.slice(25);
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

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {charges} {crypto}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none', }} align="left">
                      <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {firstTenCharactersaddress}<br />{restOfCharactersaddress}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left" >
                      <Tooltip title='Click to see the status' arrow placement='top' >
                        <a href={href}>
                          <TransactionId transactionid={txId} />
                        </a>
                      </Tooltip>
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
