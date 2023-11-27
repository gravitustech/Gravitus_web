import PropTypes from 'prop-types';
import { useState } from 'react';
import React from 'react';
// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Grid, useTheme } from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const Favicon = () => (
  <svg width="100" height="100" viewBox="0 0 368 428" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M230 200C280 200 320 240 320 290C320 307.6 315 324.2 306.2 338L367.8 400L340 427.8L277.6 366.4C263.8 375 247.4 380 230 380C180 380 140 340 140 290C140 240 180 200 230 200ZM230 240C216.739 240 204.021 245.268 194.645 254.645C185.268 264.021 180 276.739 180 290C180 303.261 185.268 315.979 194.645 325.355C204.021 334.732 216.739 340 230 340C243.261 340 255.979 334.732 265.355 325.355C274.732 315.979 280 303.261 280 290C280 276.739 274.732 264.021 265.355 254.645C255.979 245.268 243.261 240 230 240ZM180 40V200L130 155L80 200V40H40V360H120C130.8 376.2 144.6 390 160.6 400H40C29.3913 400 19.2172 395.786 11.7157 388.284C4.21427 380.783 0 370.609 0 360V40C0 29.3913 4.21427 19.2172 11.7157 11.7157C19.2172 4.21427 29.3913 0 40 0H280C290.609 0 300.783 4.21427 308.284 11.7157C315.786 19.2172 320 29.3913 320 40V196.2C308.4 185.2 295 176.2 280 170V40H180Z" fill="#848484" />
  </svg>

);
const headCells = [
  {
    id: 'Name',
    align: 'left',
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'MarketPrice',
    align: 'left',
    disablePadding: true,
    label: 'Market Price'
  },
  {
    id: 'Changes',
    align: 'left',
    disablePadding: true,
    label: '24h change'
  },
  {
    id: 'Volume',
    align: 'left',
    disablePadding: false,
    label: '24h Volume'
  },
  {
    id: 'MarketCap',
    align: 'left',
    disablePadding: false,
    label: 'Market Cap'
  }
  ,
  {
    id: 'Actions',
    align: 'right',
    disablePadding: false,
    label: 'Actions'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy, onRequestSort, }) {
  const theme = useTheme();
  const [clickCounts, setClickCounts] = useState({});

  const createSortHandler = (property) => () => {
    const currentClickCount = clickCounts[property] || 0;
    const nextClickCount = currentClickCount + 1;

    if (nextClickCount === 3) {
      // Reset order and color
      onRequestSort(null, null);
      setClickCounts({ [property]: 0 });
    } else {
      const isAsc = orderBy === property && order === 'asc';
      const nextOrder = isAsc ? 'desc' : 'asc';
      onRequestSort(property, nextOrder);
      setClickCounts({ ...clickCounts, [property]: nextClickCount });
    }
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ border: 'none', paddingLeft: '0px', paddingBottom: '7px', paddingRight: '0px' }}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === 'Actions' ? (
              <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary',paddingBottom:'4px'  }}>
                {headCell.label}
              </Typography>
            ) : (
              <>
                <Stack direction='row' >
                  <Typography variant='subtitle1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                    {headCell.label}
                  </Typography>
                  <Stack direction="column" spacing={-2.4}>
                    <ArrowDropUpIcon
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'desc'}
                      onClick={createSortHandler(headCell.id)}
                      sx={{
                        width: '18px',
                        paddingBottom: '6px',
                        cursor: 'pointer',
                        color: order === 'asc' && orderBy === headCell.id ? theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' : theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary',
                      }}
                    />
                    <ArrowDropDownIcon
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'desc'}
                      onClick={createSortHandler(headCell.id)}
                      sx={{
                        width: '18px',
                        paddingBottom: '6px',
                        cursor: 'pointer',
                        color: order === 'desc' && orderBy === headCell.id ? theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' : theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary',
                      }}
                    />
                  </Stack>
                </Stack>
              </>
            )}
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


// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// Function to get the comparator based on the sorting order and property
// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// Function to perform stable sorting with the comparator
// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// ==============================|| ORDER TABLE ||============================== //

export default function FavouriteTab() {
  const theme = useTheme();
  const [orderBy, setOrderBy] = useState('defaultProperty'); // Replace 'defaultProperty' with the default sorting property
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  // const [selected] = useState([]);

  // const isSelected = (Name) => selected.indexOf(Name) !== -1;
  return (
    <TableContainer
      sx={{
        width: '100%',
        overflowX: 'auto',
        position: 'relative',
        display: 'block',
        maxWidth: '100%',
        '& td, & th': { whiteSpace: 'nowrap' },
      }}
    >
      <Table
        aria-labelledby="tableTitle"
        sx={{
          // '& .MuiTableCell-root:first-of-type': {
          //   pl: 0
          // },
          // '& .MuiTableCell-root:last-of-type': {
          //   pr: 3
          // }
        }}
      >
        <OrderTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody>

        </TableBody>
      </Table>
      <br />
      <br />
      <Grid style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Favicon />
        <Typography variant="title3" sx={{ padding: '15px', color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }} >
          No results. Go to the Spot market to add your favorite tokens.
        </Typography>
        <Button variant="contained" color="primary">
          Add Favorite
        </Button>
      </Grid>
    </TableContainer>
  );
}
