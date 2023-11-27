import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// material-ui
import {
  useTheme,
  Typography,
  Box,
  Stack,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Drawer,
  List,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';

// third-party
import NumberFormat from 'react-number-format';

// Icon import
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Refresh from '../../../../assets/images/gravitusimage/refresh.svg';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import MoreDrawerContent from './MoreDrawerContent';
import CloseIcon from '@mui/icons-material/Close';
import Inrdepositwithdrawbutton from './Inrdepositwithdrawbutton';
import Norecordfoundcomponents from '../Norecordfoundcomponents';

//Code Started
function createData(Icon, Coin, Network, Available, USDTvalue, InOrder) {
  return { Icon, Coin, Network, Available, USDTvalue, InOrder };
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

const rows = [
  createData(<BitcoinIcon />, 'Bitcoin', 'SmartChain', '0.00013 BTC', '12.33', '0.00'),
  createData(<BitcoinIcon />, 'Bitcoin', 'SmartChain', '0.00013 BTC', '12.33', '0.00')
];

// ==============================|| MARKET TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'Coin',
    align: 'left',
    disablePadding: true,
    label: 'Coin'
  },
  {
    id: 'Available',
    align: 'left',
    disablePadding: true,
    label: 'Available'
  },
  {
    id: 'USDTvalue',
    align: 'left',
    disablePadding: true,
    label: 'USDT Value'
  },
  {
    id: 'InOrder',
    align: 'left',
    disablePadding: false,
    label: 'In Order'
  },
  {
    id: 'Actions',
    align: 'left',
    disablePadding: false,
    label: 'Actions'
  }
];

//

// ==============================|| ACS,DCS TABLE - HEADER CELL ||============================== //

function OrderTableHead({ order, orderBy, onRequestSort }) {
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
            sx={{ border: 'none', paddingBottom: '0' }}
            key={headCell.id}
            align={headCell.align}
            // padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === 'Actions' ? (
              <Typography pb={1} variant="subtitle1" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
                {headCell.label}
              </Typography>
            ) : (
              <>
                <Stack direction="row" pb={0}>
                  <Typography
                    pb={0}
                    variant="subtitle1"
                    sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                  >
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

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1, 5),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'end',
  right: 5,
  top: 32
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`
  }
}));

// ==============================|| WALLET TABLE ||============================== //

export default function WalletTableContent({ walletList, setWalletId }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const [orderBy, setOrderBy] = useState('defaultProperty'); // Replace 'defaultProperty' with the default sorting property
  const [order, setOrder] = useState('asc');

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  console.log('walletList', walletList);
  const [selected] = useState([]);

  const isSelected = (Coin) => selected.indexOf(Coin) !== -1;
  const theme = useTheme();
  const [openDrawer, setopenDrawer] = useState(false);

  const toggleDrawer = () => {
    setopenDrawer(!openDrawer);
  };

  const handleCloseDrawer = () => {
    setopenDrawer(false);
  };

  const handleClick = (id) => {
    setWalletId(id);
    navigate('/history');
  };

  const filteredWalletList = stableSort(walletList, getComparator(order, orderBy)).filter((row) =>
    row.listing.crypto.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <StyledInputBase
          sx={{
            position: 'relative',
            borderRadius: '5px',
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              width: '50%'
            },
            [theme.breakpoints.up('md')]: {
              width: '30%'
            },
            [theme.breakpoints.up('lg')]: {
              width: '20%'
            },
            borderColor: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary',
            borderWidth: '1px',
            borderStyle: 'solid',
            backgroundColor: 'transparent',
            color: theme.palette.mode === 'dark' ? 'text.white' : 'text.black'
          }}
          placeholder="Search Coin Name"
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          endAdornment={
            <SearchIconWrapper>
              <SearchIcon
                sx={{
                  color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
                }}
              />
            </SearchIconWrapper>
          }
        />

        {/* InrDepositeWithdraw */}
        <Inrdepositwithdrawbutton />
      </Stack>
      <br />
      <TableContainer
        variant="tablecontainer"
        sx={{
          width: '100%',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
          overflowY: 'scroll',
          /* Custom scrollbar styles */
          scrollbarWidth: 'thin',
          scrollbarColor: 'gray lightgray',
          height: '100%',
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
            {filteredWalletList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none' }}>
                  <Norecordfoundcomponents description="No Results Found" />
                </TableCell>
              </TableRow>
            ) : (
              filteredWalletList.map((row, index) => {
                const { listing, superWallet, totalInUsd } = row;
                const isItemSelected = isSelected(row.Coin);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    sx={{ border: 0, padding: '0', height: '64px' }}
                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                  >
                    <TableCell sx={{ border: 'none' }} component="th" id={labelId} scope="row" align="left">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <img src={listing.additionalI} alt="ico" width="24" height="24" />
                        <Stack direction="column" spacing={0.1}>
                          <Typography
                            variant="title2"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary', textAlign: 'start' }}
                          >
                            {listing.crypto}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}
                          >
                            {listing.networkInfo}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {/* <NumberFormat value={superWallet.mAvailable} displayType="text" thousandSeparator suffix={  listing.ticker}/> */}
                        {superWallet.mAvailable} {listing.ticker}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        <NumberFormat value={totalInUsd} displayType="text" thousandSeparator suffix=" USD" />
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        {superWallet.sOrders}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="right" spacing={3}>
                      <Stack direction="row" justifyContent="space-between">
                        {/* <Link variant="body1" color="text.buy" component={RouterLink} to="/spot">
                             Spot
                          </Link> */}
                        <Link
                          variant="body1"
                          color="text.buy"
                          component={RouterLink}
                          to={listing.id === 17 ? '/inrdeposit' : '/deposit'}
                          state={{ walletId: listing.id }}
                        >
                          Deposit
                        </Link>
                        <Link
                          variant="body1"
                          color="text.buy"
                          component={RouterLink}
                          to={listing.id === 17 ? '/inrwithdraw' : '/withdraw'}
                          state={{ walletId: listing.id }}
                        >
                          Withdraw
                        </Link>
                        <Link variant="body1" color="text.buy" component={RouterLink} to="/history" state={{ walletId: listing.id }}>
                          History
                        </Link>
                        <Link
                          variant="body1"
                          color="text.buy"
                          sx={{ cursor: 'pointer' }}
                          onClick={toggleDrawer}
                          state={{ walletId: listing.id }}
                        >
                          More
                        </Link>
                        <img src={Refresh} alt="Refresh" width={15} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Drawer open={openDrawer} onClose={handleCloseDrawer} anchor="right">
        <Box sx={{ width: 480 }}>
          <IconButton sx={{ marginLeft: '420px' }} onClick={handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
          <List>
            <MoreDrawerContent />
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
