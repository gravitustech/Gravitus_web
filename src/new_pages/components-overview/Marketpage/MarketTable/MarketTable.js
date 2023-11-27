import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import { Box, Stack, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, Button, ButtonBase } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';
// import TableSortLabel from '@mui/material/TableSortLabel';

// Icon import
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Norecordfoundcomponents from '../../Walletpage/Norecordfoundcomponents';
import { setConfig_ng } from 'src/utils_ng/localStorage_ng';

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

function getColor(value, theme) {
  if (value > 0) {
    return 'text.buy';
  } else if (value < 0) {
    return 'text.sell';
  } else {
    return theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary';
  }
}
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
      <TableRow style={{ position: 'sticky', top: '0', background: theme.palette.mode === 'dark' ? '#000' : '#fff' }}>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ border: 'none', padding: '0px', paddingBottom: '7px', paddingTop: '4px' }}
            key={headCell.id}
            align={headCell.align}
            // padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === 'Actions' ? (
              <Typography
                variant="subtitle1"
                sx={{
                  color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary',
                  paddingBottom: '4px',
                  paddingRight: '12px'
                }}
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
                      // active={orderBy === headCell.id}
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
                      // active={orderBy === headCell.id}
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

export default function MarketTable({ marketData, flag, searchQuery, listings, setPlatformId }) {
  const [orderBy, setOrderBy] = useState('defaultProperty'); // Replace 'defaultProperty' with the default sorting property
  const [order, setOrder] = useState('asc');
  const theme = useTheme();
  const navigate = useNavigate();

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [selected] = useState([]);

  const isSelected = (Name) => selected.indexOf(Name) !== -1;

  const handleSelect = (id) => {
    setPlatformId(id);
    setConfig_ng('spotPair', { platformId: id });
    navigate('/Spotpage')
  };

  const filteredlist = stableSort(listings, getComparator(order, orderBy))
    .filter((item) =>
      flag === 'USDT' ? item.sellPair === 'USDT' && item.platform === 'SPOT' : item.sellPair === 'INR' && item.platform === 'SPOT'
    )
    .filter((row) => row.tradePair.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Box>
      <TableContainer
        sx={{
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          width: '100%',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
          overflowY: 'scroll',
          /* Custom scrollbar styles */
          scrollbarWidth: 'thin',
          scrollbarColor: 'gray lightgray',
          height: '660px',
          '&::-webkit-scrollbar': {
            width: '0px' // Width of the scrollbar
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.mode === 'dark' ? 'black' : 'text.background' // Track color
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === 'dark' ? 'gray' : 'lightgray',
            borderRadius: '8px' // Round the corners of the thumb
          }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {filteredlist.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none' }}>
                  <Norecordfoundcomponents description="No Results Found" />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {filteredlist.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      sx={{ border: 0, padding: '0', height: '64px' }}
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.platformId}
                    // selected={isItemSelected}
                    >
                      <TableCell sx={{ border: 'none', padding: '0' }} component="th" scope="row" align="left">
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          {<MyComponent id={row.id} />}
                          <img src={row.imagePath} alt="ico" width="24" height="24" />
                          <Typography
                            variant="body1"
                            sx={{
                              color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                            }}
                          >
                            <span style={{ marginLeft: '4px' }}> {row.tradePair}</span>
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell sx={{ border: 'none', padding: '0' }} align="left">
                        <Typography variant="body1" sx={{ color: getColor(row[`24hChg`], theme) }}>
                          {row.lastPrice}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ border: 'none', padding: '0' }} align="left">
                        <Typography variant="body1" sx={{ color: getColor(row[`24hChg`], theme) }}>
                          {row[`24hChg`]}%
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ border: 'none', padding: '0' }} align="left">
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {row[`24hVolume`]}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ border: 'none', padding: '0' }} align="left">
                        <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                          {row[`24hVolume`]}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ border: 'none' }} align="right">
                        <Button variant="p2pbuybutton"
                          onClick={() => handleSelect(row.platformId)}
                        >
                          <Typography variant="body1" color="white">
                            Trade
                          </Typography>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
