import {
  useTheme, Typography, Box, Stack, Link, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Drawer, List, IconButton, TableSortLabel,
  ButtonBase
} from '@mui/material';

import Refresh from '../../../../assets/images/gravitusimage/refresh.svg';
import NoRecordFound from '../_Essentials/NoRecordFound';
import InrDpWdlBtn from './InrDpWdlBtn';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

import NumberFormat from 'react-number-format';
import MoreDrawerContent from './MoreDrawer';
import PropTypes from 'prop-types';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import useSWR, { mutate } from 'swr';

import { Wallet_Fetch_Info, Wallet_Fetch_ById, postDataWallet, Pre_Rs_Deposit, fetcherWallet } from 'src/api_ng/wallet_ng';
import CustomSnackBar from 'src/components/snackbar';

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
    id: 'totalInUsd',
    align: 'left',
    disablePadding: true,
    label: 'USDT Value'
  },
  {
    id: 'Actions',
    align: 'left',
    disablePadding: false,
    label: 'Actions'
  }
];

// ==============================|| ACS/DCS TABLE - HEADER CELL ||============================== //

function OrderTableHead({ order, orderBy, onRequestSort }) {
  const theme = useTheme();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            sx={{ border: 'none', paddingBottom: '0' }}
            key={index}
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

                  {/* <Stack direction="column" spacing={-2.4}>
                    <ArrowDropUpIcon
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
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
                      direction={orderBy === headCell.id ? order : 'asc'}
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
                  </Stack> */}
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
  // Numeric comparison for other columns
  const aValue = typeof a[orderBy] === 'string' ? parseFloat(a[orderBy]) : a[orderBy];
  const bValue = typeof b[orderBy] === 'string' ? parseFloat(b[orderBy]) : b[orderBy];

  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`
  }
}));

// ==============================|| WALLET TABLE ||============================== //

export default function WalletTableExt({ walletList, setSnackbarOpen, setSnackbarMessage }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('totalInUsd');

  const [searchQuery, setSearchQuery] = useState('');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selected] = useState([]);

  const isSelected = (Coin) => selected.indexOf(Coin) !== -1;
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredWalletList = stableSort(walletList, getComparator(order, orderBy))?.filter((row) =>
    row.listing.crypto.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCancel = () => {
    setSearchQuery('');
  };

  const [walletListing, setWalletListing] = useState(null);
  const [walletData, setWalletData] = useState(null);

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const fetchWalletById = (wallet, actionType) => {
    var postData = { "walletId": wallet.id };

    postDataWallet(Wallet_Fetch_ById(), postData).then(function (res) {
      // console.log(res, "Fetch Wallet By Id");

      if (res.error !== 'ok') {
        if (res.error.name == "Missing Authorization") {
          // Logout User
        }
        else if (res.error.name == "Invalid Authorization") {
          // Logout User
        }
        else {
          if (res.error.name != undefined) {
            // console.log(res.error.name)
          }
          else {
            // console.log('error')
          }
        }
      } else {
        if (actionType == 'moreDrawer') {
          setWalletData(res.result)
          setWalletListing(wallet);
          setOpenDrawer(!openDrawer);
        }
        else if (actionType == 'reloadWallet') {
          mutate(Wallet_Fetch_Info);
        }
      }
    }, function (err) {
      console.log(err);
      // Logout User
    });
  }

  const moreInfoDrawer = (wallet) => {
    fetchWalletById(wallet, 'moreDrawer');
  };

  const syncWalletData = (wallet) => {
    fetchWalletById(wallet, 'reloadWallet');
    mutate(Wallet_Fetch_Info);
  };

  function useINR_Predeposit() {
    var postData = { walletId: 17 };

    const { data, error, isLoading } = useSWR([Pre_Rs_Deposit(), postData], fetcherWallet, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const {
    data: walletINRRc,
    error: walletINREr,
    isLoading: isWALLETINRDataLoading
  } = useINR_Predeposit();

  if (walletINREr) {
    // Call Logout User
  }

  const INRdepositButton = () => { 
    // Your condition to determine the route
    if (walletINRRc.error !== 'ok') {
      if (walletINRRc.error.name == "Missing Authorization") {
        // Logout User
      }
      else if (walletINRRc.error.name == "Invalid Authorization") {
        // Logout User
      }
      else {
        if (walletINRRc.error.name != undefined) {
          setSnackbarMessage({ msg: walletINRRc.error.name, success: false });
          setSnackbarOpen(true);
        }
        else if (walletINRRc.error.action != undefined) {
          setSnackbarMessage({ msg: walletINRRc.error.message, success: false });
          setSnackbarOpen(true);
        }
        else {
          setSnackbarMessage({ msg: walletINRRc.error, success: false });
          setSnackbarOpen(true);
        }
      }
    } else {
      navigate('/inrdeposit');
    }
  };

  const CryptodepositButton = () => {
    navigate('/deposit');
  }

  const INRwithdrawButton = () => {
    // Your condition to determine the route
    if (walletINRRc.error !== 'ok') {
      if (walletINRRc.error.name == "Missing Authorization") {
        // Logout User
      }
      else if (walletINRRc.error.name == "Invalid Authorization") {
        // Logout User
      }
      else {
        if (walletINRRc.error.name != undefined) {
          setSnackbarMessage({ msg: walletINRRc.error.name, success: false });
          setSnackbarOpen(true);
        }
        else if (walletINRRc.error.action != undefined) {
          setSnackbarMessage({ msg: walletINRRc.error.message, success: false });
          setSnackbarOpen(true);
        }
        else {
          setSnackbarMessage({ msg: walletINRRc.error, success: false });
          setSnackbarOpen(true);
        }
      }
    } else {
      navigate('/inrwithdraw');
    }
  };

  const CryptowithdrawButton = () => {
    navigate('/withdraw');
  }

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
            borderColor: theme.palette.mode === 'dark' ? '#31384b' : 'text.tertiary',
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
            <Stack direction='row' alignItems='center' spacing={.8} pr={1}>
              {searchQuery && (
                <IconButton disableRipple edge="end" onClick={handleCancel} size="small">
                  <HighlightOffIcon fontSize="small" sx={{
                    color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
                  }} />
                </IconButton>
              )}
              <SearchIcon
                sx={{
                  color: theme.palette.mode === 'dark' ? 'text.primary' : 'text.primary'
                }}
              />
            </Stack>
          }
        />

        {/* Inr Deposite Withdraw */}
        <InrDpWdlBtn setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} />
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
            {filteredWalletList?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} align="center" sx={{ border: 'none' }}>
                  <NoRecordFound description="No Results Found" />
                </TableCell>
              </TableRow>
            ) : (
              filteredWalletList?.map((row, index) => {
                const isItemSelected = isSelected(row.Coin);
                const { listing, superWallet, totalInUsd } = row;
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    // hover
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
                        {superWallet.mAvailable} {listing.ticker}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="left">
                      <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                        <NumberFormat value={totalInUsd} displayType="text" thousandSeparator suffix=" USD" />
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ border: 'none' }} align="right" spacing={3}>
                      <Stack direction="row" justifyContent="space-between">
                        <Link
                          variant="body1"
                          color="text.buy"
                          sx={{ cursor: 'pointer' }}
                          onClick={listing.id === 17 ? (INRdepositButton) : (CryptodepositButton)}
                          state={{ walletId: listing.id }}
                        >
                          Deposit
                        </Link>
                        <Link
                          variant="body1"
                          color="text.buy"
                          sx={{ cursor: 'pointer' }}
                          onClick={listing.id === 17 ? (INRwithdrawButton) : (CryptowithdrawButton)}
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
                          onClick={() => moreInfoDrawer(row.listing)}
                          state={{ walletId: listing.id }}
                        >
                          More
                        </Link>
                        <ButtonBase
                          disableRipple
                          onClick={() => syncWalletData(row.listing)}
                        >
                          <img
                            src={Refresh}
                            alt="Refresh"
                            width={15}
                            style={{ cursor: 'pointer' }}
                          />
                        </ButtonBase>
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
        <Box sx={{ width: 520 }}>
          <IconButton sx={{ marginLeft: '450px' }} onClick={handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
          <List>
            <MoreDrawerContent walletListing={walletListing} walletData={walletData} />
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}