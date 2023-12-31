import PropTypes from 'prop-types';
import React from 'react';
// material-ui
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, useTheme, Tooltip } from '@mui/material';
import Norecordfoundcomponents from '../../Norecordfoundcomponents';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
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

// ==============================|| WITHDRAW TABLE - HEADER ||============================== //

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

// ==============================|| WITHDRAW TABLE ||============================== //

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

function WithdrawTable({ historyData }) {
  const theme = useTheme();
  // console.log({ historyData });
  return (
    <>
      <TableContainer variant="tablecontainer"
        sx={{
          width: '100%',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
          overflowY: 'scroll',
          /* Custom scrollbar styles */
          scrollbarWidth: 'thin',
          scrollbarColor: 'gray lightgray',
          height: '260px',
          '&::-webkit-scrollbar': {
            width: '4px ', // Width of the scrollbar
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
            {historyData ? (
              historyData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} align="center" sx={{ border: 'none', }}>
                    <Norecordfoundcomponents
                      description='No Record Found' />
                  </TableCell>
                </TableRow>
              ) : (
                historyData?.map((row, index) => {
                  // const isItemSelected = isSelected(row.Name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const { userId, crypto, transType, transDesc, highlight, amount, charges, address, txId, href, status, date, timeStamp } = row;
                  const firstTenCharactersaddress = address.slice(0, 25);
                  const restOfCharactersaddress = address.slice(25);

                  return (
                    <>
                      <TableRow
                        hover
                        role="checkbox"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: '64px' }}
                        tabIndex={-1}
                        key={userId}
                      >
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
                          <Typography variant="body1">{status}</Typography>
                        </TableCell>

                        <TableCell sx={{ border: 'none' }} align="right">
                          <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                            {new Date(Number(timeStamp)).toLocaleString()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                }))
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none', }}>
                  <Norecordfoundcomponents
                    description='Select the coin' />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default WithdrawTable;