import { TextField, Typography, useTheme } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

import { useLocation } from 'react-router';
import React, { useState, useEffect } from 'react';
import { Deposit_Address, Wallet_Fetch_ById, postDataWallet } from 'src/api_ng/wallet_ng';

function CoinSelectTextfield({ walletList, setDepositData, setHistoryData }) {
  const theme = useTheme();
  const location = useLocation();

  const { walletId } = location.state ? location.state : { walletId: null };
  const [selectCoin, setselectCoin] = useState(walletId && walletList.find((item) => item.listing.id === walletId));

  // ################### Start Fetch Wallet Address ###################

  function fetchWalletAddr(walletId) {
    var postData = {
      "walletId": walletId
    };

    postDataWallet(Deposit_Address(), postData).then(function (res) {
      // console.log(res);

      if (res.error !== 'ok') {
        handleCloseDialog();
        setIsLoading(false);

        if (res.error.name == "Missing Authorization") {
          // Logout User
        }
        else if (res.error.name == "Invalid Authorization") {
          // Logout User
        }
        else {
          if (res.error.name != undefined) {
            setSnackbarMessage({ msg: res.error.name, success: false });
            setSnackbarOpen(true);
          }
          else {
            setSnackbarMessage({ msg: res.error, success: false });
            setSnackbarOpen(true);
          }
        }
      } else {
        setDepositData(res.result);
      }
    }, function (err) {
      // console.log(err);
      // Logout User
    });
  }

  // ################### Start Fetch Wallet By Id ################### 

  function fetchWalletById(walletId) {
    var postData = {
      "walletId": walletId
    };

    postDataWallet(Wallet_Fetch_ById(), postData).then(function (res) {
      // console.log(res);

      if (res.error !== 'ok') {
        handleCloseDialog();
        setIsLoading(false);

        if (res.error.name == "Missing Authorization") {
          // Logout User
        }
        else if (res.error.name == "Invalid Authorization") {
          // Logout User
        }
        else {
          if (res.error.name != undefined) {
            setSnackbarMessage({ msg: res.error.name, success: false });
            setSnackbarOpen(true);
          }
          else {
            setSnackbarMessage({ msg: res.error, success: false });
            setSnackbarOpen(true);
          }
        }
      } else {
        setHistoryData(res.result.external.filter((item) => item.transType === 'Deposit'));
      }
    }, function (err) {
      // console.log(err);
      // Logout User
    });
  }

  // ################### End ###################

  const handleChange = async (e, val, id) => {
    setselectCoin(val);
    if (id) {
      try {
        fetchWalletById(id);
        fetchWalletAddr(id);
      } catch (e) {
        // console.log(e.message);
      }
    } else {
      setHistoryData(null);
      setDepositData(null);
    }
  };

  useEffect(() => {
    if (walletId) {
      handleChange(
        null,
        walletList.find((item) => item.listing.id === walletId),
        walletId
      );
    }
  }, [walletId]);

  return (
    <Stack pl={{ xs: 0, sm: 0, md: 5, lg: 5 }}
      // pr={{ xs: 2, sm: 2 }}
      sx={{
        width: { xs: '100%', sm: '100%', md: '90%', lg: '90%' }
      }}>
      <Autocomplete
        id="country-customized-option-demo"
        options={walletList}
        // disableCloseOnSelect
        getOptionLabel={(option) => `${option.listing.ticker} (${option.listing.crypto})`}
        renderOption={(props, option) => (
          <Stack {...props} direction="row" spacing={1} alignItems="center" sx={{
            backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
          }}>
            <img src={option.listing.additionalI} alt="ico" width="24" height="24" />
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              {option.listing.ticker}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              {option.listing.crypto}
            </Typography>
          </Stack>
        )}
        value={selectCoin}
        onChange={(e, val) => handleChange(e, val, val?.superWallet?.walletId)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select the coin"
            sx={{
              '& .MuiInputBase-input': {
                height: '12px',
                borderRadius: '5px',
                borderColor: '#959595'
              }
            }}
          />
        )}
      />
    </Stack>
  );
}

export default CoinSelectTextfield;