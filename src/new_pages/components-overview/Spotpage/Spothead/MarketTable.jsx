import PropTypes from 'prop-types';
import React from 'react';
import { useState, useEffect } from 'react';
// material-ui
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Grid,
  useTheme,
} from '@mui/material';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { styled } from '@mui/system';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import useSWR, { mutate } from 'swr';
import { fetcher, getMarketURL, getSpotURL } from '../../../../api/spot';
import { setConfig_ng } from '../../../../utils_ng/localStorage_ng';

import Norecordfoundcomponents from '../../Walletpage/Norecordfoundcomponents';
import { MarketOverview_URL } from 'src/api_ng/market_ng';
import { fetcherSPOT } from 'src/api_ng/spotTrade_ng';

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //
const keyframes = `
@keyframes wave {
  0% {
    transform: scale(.5);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(.5);
  }
}
`;

const Wave = styled('div')({
  justifyContent: 'center',
  alignItems: 'center',
  width: '4px',
  height: '25px',
  background: '#00BBAB',
  margin: '3px',
  animation: 'wave 1s linear infinite',
  borderRadius: '5px',
});

const WaveContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

function getColor(value, theme) {
  if (value > 0) {
    return 'text.buy';
  } else if (value < 0) {
    return 'text.sell';
  } else {
    return theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary';
  }
}

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
        <StarIcon onClick={handleClick} style={{ color: '#F0B90B', cursor: 'pointer', fontSize: '24px' }} />
      ) : (
        <StarBorderIcon onClick={handleClick} style={{ cursor: 'pointer', fontSize: '24px' }} />
      )}
    </>
  );
}

const headCells = [
  {
    id: 'Name',
    align: 'left',
    disablePadding: true,
    label: 'Pair'
  },
  {
    id: 'MarketPrice',
    align: 'left',
    disablePadding: true,
    label: 'Price'
  },
  // {
  //   id: 'Changes',
  //   align: 'right',
  //   disablePadding: true,
  //   label: '24h Changes'
  //  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy, onRequestSort }) {
  const [clickCounts, setClickCounts] = useState({});
  const theme = useTheme();

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
      <TableRow style={{ position: 'sticky', top: '0', background: theme.palette.mode === 'dark' ? '#000' : '#fff' }}>
        {headCells.map((headCell) => (
          <TableCell
            sx={{ border: 'none', paddingTop: '0', paddingBottom: '0' }}
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
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
                          ? 'text.primary'
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
                          ? 'text.primary'
                          : 'text.primary'
                  }}
                />
              </Stack>
            </Stack>
          </TableCell>
        ))}
        <TableCell
          padding='none'
          sx={{ border: 'none', paddingTop: '0', paddingBottom: '0' }}
          key='changes'
          align='right'
        >
          <Stack direction='row' textAlign='end' justifyContent='end'>
            <Typography variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              24h Changes
            </Typography>
            <Stack direction="column" spacing={-2.4}>
              <ArrowDropUpIcon
                active={orderBy === '24hChanges'}
                direction={orderBy === '24hChanges' ? order : 'desc'}
                onClick={createSortHandler('24hChanges')}
                sx={{
                  width: '18px',
                  paddingBottom: '6px',
                  cursor: 'pointer',
                  color:
                    order === 'asc' && orderBy === '24hChanges'
                      ? theme.palette.mode === 'dark'
                        ? 'text.secondarydark'
                        : 'text.secondary'
                      : theme.palette.mode === 'dark'
                        ? 'text.primary'
                        : 'text.primary'
                }}
              />
              <ArrowDropDownIcon
                active={orderBy === '24hChanges'}
                direction={orderBy === '24hChanges' ? order : 'desc'}
                onClick={createSortHandler('24hChanges')}
                sx={{
                  width: '18px',
                  paddingBottom: '6px',
                  cursor: 'pointer',
                  color:
                    order === 'desc' && orderBy === '24hChanges'
                      ? theme.palette.mode === 'dark'
                        ? 'text.secondarydark'
                        : 'text.secondary'
                      : theme.palette.mode === 'dark'
                        ? 'text.primary'
                        : 'text.primary'
                }}
              />
            </Stack>
          </Stack>

        </TableCell>
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

// ==============================|| ORDER TABLE ||============================== //

export default function MarketTable({ flag, setPlatformId, handleClose, searchQuery }) {
  const theme = useTheme();
  const [orderBy, setOrderBy] = useState('defaultProperty'); // Replace 'defaultProperty' with the default sorting property

  const [order, setOrder] = useState('asc');
  const [selected] = useState([]);
  
  const isSelected = (Name) => {
    selected.indexOf(Name) !== -1
  };

  function useMarketOverview() {
    var postData = { "callfrom": 'markets' };
  
    const {data, error, isLoading} = useSWR([MarketOverview_URL(), postData], fetcherSPOT, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return {data, error, isLoading};
  }

  const { data, error } = useMarketOverview();

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelect = (id) => {
    handleClose();
    setPlatformId(id);
    setConfig_ng('spotPair', {platformId : id});
  };

  const filteredListings = (data && data.result && data.result.listings || [])
    .filter((item) =>
      flag === 'USDT'
        ? item.sellPair === 'USDT' && item.platform === 'SPOT'
        : item.sellPair === 'INR' && item.platform === 'SPOT'
    )
    .filter((row) =>
      row.tradePair.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <TableContainer
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
          width: '4px', // Width of the scrollbar
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
        aria-label="sticky table"
        size="small"
        sx={{
          minWidth: 450,
        }}
      >
        <OrderTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
        {data ? (
          <TableBody>
            {filteredListings.length === 0 ? (
             <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none', }}>
                  <Norecordfoundcomponents
                    description='No Results Found' />
                </TableCell>
              </TableRow>
            ) : (
              stableSort(filteredListings, getComparator(order, orderBy)).map((row, index) => {
                const isItemSelected = isSelected(row.platformId);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    padding="0"
                    hover
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.platformId}
                    selected={isItemSelected}
                    onClick={() => handleSelect(row.platformId)}
                  >
                    <TableCell sx={{ border: 'none' }} component="th" id={labelId} scope="row" align="left" >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Stack onClick={(e) => e.stopPropagation()}><MyComponent id={row.id} /></Stack>
                        <img src={row.imagePath} alt="ico" width="24" height="24" />
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                          }}
                        >
                          {row.tradePair}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant="subtitle1" sx={{ color: getColor(row[`24hChg`], theme) }}>
                        {row.lastPrice}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="right">
                      <Typography variant="subtitle1" sx={{ paddingRight: '8px', color: getColor(row[`24hChg`], theme) }}>
                        {row[`24hChg`]}%
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        ) : (
          <TableBody>
            <TableCell sx={{ border: 'none' }} align="right">
            </TableCell>
            <TableCell sx={{ border: 'none' }} align="left">
              <Grid pt={20} pb={20} pl={4}   >
                <style dangerouslySetInnerHTML={{ __html: keyframes }} />
                <WaveContainer>
                  {[...Array(5)].map((_, index) => (
                    <Wave key={index} style={{ animationDelay: `${index * 0.1}s` }} />
                  ))}
                </WaveContainer>
              </Grid>
            </TableCell>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
