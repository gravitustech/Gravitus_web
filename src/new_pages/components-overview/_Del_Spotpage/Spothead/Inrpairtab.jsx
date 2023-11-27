import PropTypes from 'prop-types';
import React from 'react';
import { useState, useEffect } from 'react';
// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Grid, useTheme } from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const Favicon = () => (
  <svg width="100" height="100" viewBox="0 0 368 428" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M230 200C280 200 320 240 320 290C320 307.6 315 324.2 306.2 338L367.8 400L340 427.8L277.6 366.4C263.8 375 247.4 380 230 380C180 380 140 340 140 290C140 240 180 200 230 200ZM230 240C216.739 240 204.021 245.268 194.645 254.645C185.268 264.021 180 276.739 180 290C180 303.261 185.268 315.979 194.645 325.355C204.021 334.732 216.739 340 230 340C243.261 340 255.979 334.732 265.355 325.355C274.732 315.979 280 303.261 280 290C280 276.739 274.732 264.021 265.355 254.645C255.979 245.268 243.261 240 230 240ZM180 40V200L130 155L80 200V40H40V360H120C130.8 376.2 144.6 390 160.6 400H40C29.3913 400 19.2172 395.786 11.7157 388.284C4.21427 380.783 0 370.609 0 360V40C0 29.3913 4.21427 19.2172 11.7157 11.7157C19.2172 4.21427 29.3913 0 40 0H280C290.609 0 300.783 4.21427 308.284 11.7157C315.786 19.2172 320 29.3913 320 40V196.2C308.4 185.2 295 176.2 280 170V40H180Z" fill="#848484" />
  </svg>

);


function createData(FavIcon, Icon, Name, MarketPrice, Changes,) {
  return { FavIcon, Icon, Name, MarketPrice, Changes, };
}
const BitcoinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.6409 14.9029C22.0381 21.3315 15.5262 25.2438 9.09605 23.6407C2.66863 22.038 -1.24415 15.5265 0.359423 9.09837C1.96159 2.66903 8.47348 -1.24361 14.9016 0.359081C21.3313 1.96177 25.2438 8.47404 23.6408 14.903L23.6409 14.9029H23.6409Z" fill="#F7931A" />
    <path d="M17.2923 10.2903C17.5312 8.69333 16.3153 7.83492 14.6526 7.26227L15.192 5.09908L13.875 4.77096L13.3499 6.8772C13.0037 6.79086 12.6482 6.70951 12.2948 6.62886L12.8237 4.50872L11.5075 4.1806L10.9679 6.34309C10.6814 6.27787 10.4 6.21341 10.1269 6.14548L10.1285 6.13868L8.31237 5.68522L7.96204 7.09165C7.96204 7.09165 8.93911 7.31559 8.91852 7.32937C9.45181 7.46246 9.54825 7.81545 9.53223 8.09523L8.91781 10.5596C8.95453 10.5689 9.00217 10.5824 9.05473 10.6035C9.01079 10.5926 8.96404 10.5807 8.91552 10.5691L8.05431 14.0214C7.98914 14.1834 7.82372 14.4265 7.45086 14.3342C7.46406 14.3533 6.49369 14.0953 6.49369 14.0953L5.83984 15.6026L7.55364 16.0298C7.87246 16.1098 8.1849 16.1934 8.49258 16.2721L7.94761 18.4601L9.26304 18.7882L9.80272 16.6234C10.1621 16.721 10.5108 16.8109 10.8522 16.8958L10.3144 19.0503L11.6314 19.3784L12.1763 17.1945C14.422 17.6195 16.1105 17.4482 16.8213 15.4172C17.394 13.782 16.7928 12.8388 15.6113 12.2238C16.4718 12.0253 17.12 11.4594 17.2928 10.2904L17.2924 10.2902L17.2923 10.2903ZM14.2834 14.5091C13.8764 16.1443 11.123 15.2603 10.2302 15.0387L10.9534 12.14C11.8461 12.3628 14.7088 12.8038 14.2835 14.5091H14.2834ZM14.6907 10.2666C14.3194 11.7539 12.0277 10.9983 11.2843 10.813L11.9399 8.18403C12.6834 8.36933 15.0774 8.71515 14.6908 10.2666H14.6907Z" fill="white" />
  </svg>
);

function MyComponent({ id }) {
  const [clicked, setClicked] = useState(
    localStorage.getItem(`iconClicked-${id}`) === 'true'
  );

  useEffect(() => {
    localStorage.setItem(`iconClicked-${id}`, clicked.toString());
  }, [clicked]);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    < >
      {clicked ? (
        <StarIcon onClick={handleClick} style={{ color: "#F0B90B", cursor: "pointer", fontSize: '24px' }} />
      ) : (
        <StarBorderIcon onClick={handleClick} style={{ cursor: "pointer", fontSize: '24px' }} />
      )}
    </ >
  );
}

const rows = [
  createData(
    <MyComponent id={5} />,
    <BitcoinIcon />, 'BTC / INR', '₹26,625.256', '+1.54% ',),
  createData(
    <MyComponent id={6} />,
    <BitcoinIcon />, 'ETH / INR', '₹19,85.202', '+2.85% ',),
  createData(
    <MyComponent id={7} />,
    <BitcoinIcon />, 'EPX / INR', '₹125.02365', '+8.85% ',),
  createData(
    <MyComponent id={8} />,
    <BitcoinIcon />, 'LINK / INR', '₹166.3253', '+3.85% ',),
];

const headCells = [
  {
    id: 'Name',
    align: 'left',
    disablePadding: true,
    label: 'Pair',
  },
  {
    id: 'MarketPrice',
    align: 'left',
    disablePadding: true,
    label: 'Price'
  },
  {
    id: 'Changes',
    align: 'right',
    disablePadding: true,
    label: 'Change'
  },

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
            sx={{ border: 'none', paddingTop: '0', paddingBottom: '0' }}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >


            <Stack direction='row' >
              <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
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


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// Function to get the comparator based on the sorting order and property
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Function to perform stable sorting with the comparator
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE ||============================== //

export default function INRTable() {
  const theme = useTheme();
  const [orderBy, setOrderBy] = useState('defaultProperty'); // Replace 'defaultProperty' with the default sorting property
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const [selected] = useState([]);

  const isSelected = (Name) => selected.indexOf(Name) !== -1;
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
          '& .MuiTableCell-root:nth-child(3)': {
            pl: 6,
          },
          '& .MuiTableCell-root:nth-child(2)': {
            pl: 6,
          },
          '& .MuiTableCell-root:nth-child (1)': {
            pl: 0,
          },
        }}
      >
        <OrderTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
            const isItemSelected = isSelected(row.Name);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                padding='0'
                hover
                role="checkbox"
                sx={{ cursor: 'pointer' }}
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.Name}
                selected={isItemSelected}
              >
                <TableCell sx={{ border: 'none' }} component="th" id={labelId} scope="row" align="left">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {row.FavIcon}
                    {row.Icon}
                    <Typography variant='subtitle1' sx={{
                      color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary',
                    }}>
                      <span style={{ marginLeft: '1px' }}>{row.Name}</span>
                    </Typography>
                  </Stack>
                </TableCell>

                <TableCell sx={{ border: 'none' }} align="left">
                  <Typography variant='subtitle1' color='text.buy'>
                    {row.MarketPrice}
                  </Typography>
                </TableCell>

                <TableCell sx={{ border: 'none', }} align="right">
                  <Typography variant='subtitle1' sx={{ paddingRight: '12px' }} color='text.buy'>
                    {row.Changes}
                  </Typography>
                </TableCell>



              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
