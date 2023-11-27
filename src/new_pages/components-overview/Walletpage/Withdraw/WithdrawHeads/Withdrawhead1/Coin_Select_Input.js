import { FormHelperText, TextField, Typography, useTheme } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router';
// import { values } from 'lodash';

// import { getWalletDataById } from '../../../../../../api/wallet';
import { Wallet_Fetch_ById, postDataWallet } from 'src/api_ng/wallet_ng';

function CoinSelectTextfield({ walletList, walletId, setWalletId, setHistoryData,
  setWalletData, handleBlur, error, touched, errors, values, setFieldValue, coin, formik}) {

  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(walletId && walletList.find((item) => item.listing.id === walletId));

  // ################### Start Fetch Wallet By Id ################### 

  function fetchWalletById(walletId) {
    var postData = {
      "walletId" : walletId
    };

    postDataWallet(Wallet_Fetch_ById(), postData).then(function (res) {
      console.log(res);
      
      if (res.error !== 'ok') {
        handleCloseDialog();
        setIsLoading(false);

        if(res.error.name == "Missing Authorization") {
          // Logout User
        }
        else if (res.error.name == "Invalid Authorization") {
          // Logout User
        }
        else {
          if(res.error.name != undefined) {
            setSnackbarMessage({ msg: res.error.name, success: false });
            setSnackbarOpen(true);
          }
          else {
            setSnackbarMessage({ msg: res.error, success: false });
            setSnackbarOpen(true);
          }
        }
      } else {
        setHistoryData(res.result.external.filter((item) => item.transType === 'Withdraw'));
        setWalletData(res.result);
      }
    }, function (err) {
      console.log(err);
      // Logout User
    });
  }

  // ################### End ###################

  const handleChange = async (e, val, id,) => {
    setSelectedItem(val);
    setWalletId(id);
    setFieldValue('coin', val);

    if (id) {
      try {
        fetchWalletById(id);

        // Govarthan Code
        // const { data } = await getWalletDataById({ accountType: 'GRAVITUS', postData: { walletId: id } });
        // setHistoryData(data.result.external.filter((item) => item.transType === 'Withdraw'));
        // setWalletData(data.result);
      } catch (e) {
        console.log(e.message);
      }
    } else {
      setHistoryData(null)
      setWalletData(null)
      setFieldValue('coin', val);
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
    <Stack pl={5} sx={{ width: '90%' }}>
      <Autocomplete
        id="country-customized-option-demo"
        options={walletList}
        getOptionLabel={(option) => `${option.listing.ticker} (${option.listing.crypto})`}
        renderOption={(props, option) => (
          <Stack {...props} direction="row" spacing={1} alignItems='center'>
            <img src={option.listing.additionalI} alt="ico" width="24" height="24" />
            <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>{option.listing.ticker}</Typography>
            <Typography variant='subtitle2' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>{option.listing.crypto}</Typography>
          </Stack>
        )}
        value={selectedItem}
        onChange={(e, val) => {
          handleChange(e, val, val?.listing?.id);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={values?.coin}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Select the coin"
            error={Boolean(touched?.coin && error?.coin)}
            sx={{
              '& .MuiInputBase-input': {
                height: '12px',
                borderRadius: '5px',
                borderColor: error && touched ? 'red' : '#959595',
              }
            }}
            helperText={error && touched ? error : ''}
          />
        )}
      />
      {touched?.coin && errors?.coin && (
        <FormHelperText error id="standard-weight-helper-text-email-login">
          {errors?.coin}
        </FormHelperText>
      )}
    </Stack>
  );
}

export default CoinSelectTextfield;