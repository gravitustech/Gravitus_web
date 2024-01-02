import { Stack, useTheme, Typography, Divider, CircularProgress, ButtonBase, Card, IconButton, InputBase, Button } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import NumberFormat from 'react-number-format';
import Refresh from '../../../../../assets/images/gravitusimage/refresh.svg';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Norecordfoundcomponents from '../../_Essentials/NoRecordFound';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Wallet_Fetch_ById, Wallet_Fetch_Info, postDataWallet } from 'src/api_ng/wallet_ng';
import { mutate } from 'swr';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(0.2, 0.2, 0.2, 0.2),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
  }
}));

const CoinListing = ({ walletList, setSnackbarOpen, setSnackbarMessage }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);


  const [searchQuery, setSearchQuery] = useState('');

  const handleCancel = () => {
    setSearchQuery('');
  };

  const Search = () => {
    return (
      <>
        <StyledInputBase
          sx={{
            height: '100%',
            borderRadius: '3px',
            width: '100%',
            borderColor: theme.palette.mode === 'dark' ? '#31384b' : 'text.tertiary',
            borderWidth: '1px',
            borderStyle: 'solid',
            backgroundColor: 'transparent',
            color: theme.palette.mode === 'dark' ? 'text.white' : 'text.black',
          }}
          placeholder="Search Coin Pair"
          inputProps={{ 'aria-label': 'search' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          endAdornment={
            <Stack direction='row' alignItems='center' spacing={.8} pr={1} >
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
      </>
    )
  }

  const filteredWalletList = walletList?.filter((row) =>
    row.listing.crypto.toLowerCase().includes(searchQuery.toLowerCase()));

  const fetchWalletById = (wallet, actionType) => {
    if (actionType == 'reloadWallet') {
      setIsLoading((prevState) => ({
        ...prevState,
        [wallet.id]: true, // Set loading to true for the specific coin
      }));
    }
    var postData = { "walletId": wallet.id };

    postDataWallet(Wallet_Fetch_ById(), postData).then(function (res) {
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

        if (actionType == 'reloadWallet') {
          mutate(Wallet_Fetch_Info);
          setIsLoading((prevState) => ({
            ...prevState,
            [wallet.id]: false, // Set loading to false for the specific coin
          }));
        }
      }
    }, function (err) {
      // console.log(err);
      // Logout User
    });
  }


  const syncWalletData = (wallet) => {
    fetchWalletById(wallet, 'reloadWallet');
    mutate(Wallet_Fetch_Info);
  };
  return (
    <>
      <Stack spacing={2}>
        <Stack
          direction="row" spacing={2} pb={1.5} justifyContent="space-between"
        >
          <Stack spacing={1} direction="row" justifyContent="start"  >
            <Typography variant='title1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              Coin Listings
            </Typography>
          </Stack>
          <Stack spacing={1} pr={1} textAlign='end' justifyContent='end'>
            <Search />
          </Stack>
        </Stack>

        {filteredWalletList?.length === 0 ? (
          <Card
            sx={{
              boxShadow: '0',
              textDecorationLine: 'none',
            }}
          >
            <Norecordfoundcomponents description="No Results Found" />
          </Card>
        ) : (
          filteredWalletList?.sort((a, b) => b.totalInUsd - a.totalInUsd)
            ?.map((row, index) => {
              // const isItemSelected = isSelected(row.Coin);
              const { listing, superWallet, totalInUsd } = row;
              // const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <>
                  <Card
                    sx={{
                      boxShadow: '0',
                      textDecorationLine: 'none',
                    }}
                    component={RouterLink}
                    to={'/coindetails'}
                    state={{ walletId: listing.id }}
                  >
                    <Stack
                      sx={{ backgroundColor: theme.palette.mode === 'dark' ? '#131722' : 'text.backgroundcard', }}
                      direction="row" spacing={2} justifyContent="space-between" key={index}
                    >
                      <Stack spacing={1} direction="row" justifyContent="start"  >
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
                      </Stack>

                      <Stack spacing={1} textAlign='end' justifyContent='end'>
                        <Stack direction='row' spacing={2} alignItems='center'>
                          <Stack spacing={0.1} >
                            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                              {superWallet.mAvailable} {listing.ticker}
                            </Typography>
                            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                              <NumberFormat value={totalInUsd} displayType="text" thousandSeparator suffix=" USD" />
                            </Typography>
                          </Stack>
                          {/* <Stack spacing={0.1} >
                            <MoreVertIcon />
                          </Stack> */}
                          {/* <Stack spacing={1} onClick={(e) => e.stopPropagation()}>
                            {isLoading[row.listing.id] ? <CircularProgress color="success" size={15.5} /> : (
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
                            )}
                          </Stack> */}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Card>
                  <Divider></Divider>
                </>
              )
            })
        )}
      </Stack>
    </>
  )
}

export default CoinListing;
