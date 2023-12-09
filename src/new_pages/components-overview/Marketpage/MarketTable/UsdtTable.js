import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Stack, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
// import TableSortLabel from '@mui/material/TableSortLabel';

// Icon import
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function createData(FavIcon, Icon, Name, MarketPrice, Changes, Volume, MarketCap, Actions) {
  return { FavIcon, Icon, Name, MarketPrice, Changes, Volume, MarketCap, Actions };
}
const BitcoinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.6409 14.9029C22.0381 21.3315 15.5262 25.2438 9.09605 23.6407C2.66863 22.038 -1.24415 15.5265 0.359423 9.09837C1.96159 2.66903 8.47348 -1.24361 14.9016 0.359081C21.3313 1.96177 25.2438 8.47404 23.6408 14.903L23.6409 14.9029H23.6409Z"
      fill="#F7931A"
    />
    <path
      d="M17.2923 10.2903C17.5312 8.69333 16.3153 7.83492 14.6526 7.26227L15.192 5.09908L13.875 4.77096L13.3499 6.8772C13.0037 6.79086 12.6482 6.70951 12.2948 6.62886L12.8237 4.50872L11.5075 4.1806L10.9679 6.34309C10.6814 6.27787 10.4 6.21341 10.1269 6.14548L10.1285 6.13868L8.31237 5.68522L7.96204 7.09165C7.96204 7.09165 8.93911 7.31559 8.91852 7.32937C9.45181 7.46246 9.54825 7.81545 9.53223 8.09523L8.91781 10.5596C8.95453 10.5689 9.00217 10.5824 9.05473 10.6035C9.01079 10.5926 8.96404 10.5807 8.91552 10.5691L8.05431 14.0214C7.98914 14.1834 7.82372 14.4265 7.45086 14.3342C7.46406 14.3533 6.49369 14.0953 6.49369 14.0953L5.83984 15.6026L7.55364 16.0298C7.87246 16.1098 8.1849 16.1934 8.49258 16.2721L7.94761 18.4601L9.26304 18.7882L9.80272 16.6234C10.1621 16.721 10.5108 16.8109 10.8522 16.8958L10.3144 19.0503L11.6314 19.3784L12.1763 17.1945C14.422 17.6195 16.1105 17.4482 16.8213 15.4172C17.394 13.782 16.7928 12.8388 15.6113 12.2238C16.4718 12.0253 17.12 11.4594 17.2928 10.2904L17.2924 10.2902L17.2923 10.2903ZM14.2834 14.5091C13.8764 16.1443 11.123 15.2603 10.2302 15.0387L10.9534 12.14C11.8461 12.3628 14.7088 12.8038 14.2835 14.5091H14.2834ZM14.6907 10.2666C14.3194 11.7539 12.0277 10.9983 11.2843 10.813L11.9399 8.18403C12.6834 8.36933 15.0774 8.71515 14.6908 10.2666H14.6907Z"
      fill="white"
    />
  </svg>
);

function MyComponent({ id }) {
  const [clicked, setClicked] = useState(localStorage.getItem(`iconClicked-${id}`) === 'true');

  useEffect(() => {
    localStorage.setItem(`iconClicked-${id}`, clicked.toString());
  }, [clicked]);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      {clicked ? (
        <StarIcon onClick={handleClick} style={{ color: '#F0B90B', cursor: 'pointer' }} />
      ) : (
        <StarBorderIcon onClick={handleClick} style={{ cursor: 'pointer' }} />
      )}
    </>
  );
}

const rows = [
  createData(<MyComponent id={1} />, <BitcoinIcon />, 'BTC / USDT', '$26,625.256', '+1.54% ', 40, 22, 'Trade'),
  createData(<MyComponent id={2} />, <BitcoinIcon />, 'ETH / USDT', '$19,85.202', '+2.85% ', 36, 63, 'Trade'),
  createData(<MyComponent id={3} />, <BitcoinIcon />, 'EPX / USDT', '$125.02365', '+8.85% ', 52, 78, 'Trade'),
  createData(<MyComponent id={4} />, <BitcoinIcon />, 'LINK / USDT', '$166.3253', '+3.85% ', 12, 42, 'Trade')
];

// ==============================|| MARKET TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'Name',
    align: 'left',
    disablePadding: true,
    label: 'Name'
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
  },
  {
    id: 'Actions',
    align: 'right',
    disablePadding: false,
    label: 'Actions'
  }
];

// ==============================|| ACS,DCS TABLE - HEADER CELL ||============================== //

function OrderTableHead({ order, orderBy, onRequestSort }) {
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
  const theme = useTheme();
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            sx={{ border: 'none', padding: '0px', paddingBottom: '7px', paddingTop: '4px' }}
            key={index}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === 'Actions' ? (
              <Typography
                variant="subtitle1"
                sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary', paddingBottom: '4px' }}
              >
                {headCell.label}
              </Typography>
            ) : (
              <>
                <Stack direction="row">
                  <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
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
                        color:
                          order === 'asc' && orderBy === headCell.id
                            ? theme.palette.mode === 'dark'
                              ? 'text.secondarydark'
                              : 'text.secondary'
                            : theme.palette.mode === 'dark'
                              ? 'text.primarydark'
                              : 'text.primary'
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
                        color:
                          order === 'desc' && orderBy === headCell.id
                            ? theme.palette.mode === 'dark'
                              ? 'text.secondarydark'
                              : 'text.secondary'
                            : theme.palette.mode === 'dark'
                              ? 'text.primarydark'
                              : 'text.primary'
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
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
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

// ==============================|| MARKET TABLE ||============================== //

export default function USDTTable({ marketData }) {
  const [orderBy, setOrderBy] = useState('defaultProperty'); // Replace 'defaultProperty' with the default sorting property
  const [order, setOrder] = useState('asc');
  // console.log({ marketData });
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [selected] = useState([]);

  const isSelected = (Name) => selected.indexOf(Name) !== -1;
  const theme = useTheme();
  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              return (
                <TableRow
                  role="checkbox"
                  sx={{ border: 0, padding: '0', height: '54px' }}
                  tabIndex={-1}
                  key={index}
                >
                  <TableCell sx={{ border: 'none', padding: '0' }} component="th" scope="row" align="left">
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      {row.FavIcon}
                      {row.Icon}
                      <Typography
                        variant="title2"
                        sx={{
                          color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                        }}
                      >
                        <span style={{ marginLeft: '4PX' }}>{row.Name}</span>
                      </Typography>
                    </Stack>
                  </TableCell>

                  <TableCell sx={{ border: 'none', padding: '0' }} align="left">
                    <Typography variant="title2" color="text.buy">
                      {row.MarketPrice}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ border: 'none', padding: '0' }} align="left">
                    <Typography variant="title2" color="text.buy">
                      {row.Changes}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ border: 'none', padding: '0' }} align="left">
                    <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      <NumberFormat value={row.Volume} displayType="text" thousandSeparator prefix="$" suffix="B" />
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ border: 'none', padding: '0' }} align="left">
                    <Typography variant="title2" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      <NumberFormat value={row.MarketCap} displayType="text" thousandSeparator prefix="$" suffix="B" />
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ border: 'none', padding: '0' }} align="right">
                    <Link color="text.buy" variant="title2" component={RouterLink} to="/spot">
                      {row.Actions}
                    </Link>
                  </TableCell>

                  <TableCell sx={{ border: 'none' }} align="right">
                    <Link
                      color="text.buy"
                      variant="title2"
                      component={RouterLink}
                      to={row.platform === 'SPOT' ? '/spot' : '/p2p'}
                      state={{ platformId: row.platformId }}
                    >
                      Trade
                    </Link>
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
