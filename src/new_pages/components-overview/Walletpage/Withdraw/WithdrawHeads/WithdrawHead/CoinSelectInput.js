import { FormHelperText, TextField, Typography, useTheme } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';

import React, { useState, useEffect } from 'react';
import { Wallet_Fetch_ById, postDataWallet } from 'src/api_ng/wallet_ng';

function CoinSelectTextfield({ values, errors, touched, walletList,
  walletId, setWalletId, setFieldValue, handleBlur }) {

  // console.log(touched, 'touched');
  // console.log(errors, 'errors');
  // console.log(values, 'values');

  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState(walletId && walletList.find((item) => item.listing.id === walletId));

  const handleChange = async (evt, val, id) => {
    setFieldValue('coin', val);
    setSelectedItem(val);
    setWalletId(id);
  };

  useEffect(() => {
    if (walletId) {
      var superCoin = walletList.find((item) => item.listing.id === walletId);
      setFieldValue('coin', superCoin);
      setSelectedItem(superCoin);
    }
  }, [walletId]);

  return (
    <Stack pl={5} sx={{ width: { xs: '100%', sm: '100%', md: '90%', lg: '90%' } }}>
      <Autocomplete
        id="country-customized-option-demo"
        options={walletList}
        getOptionLabel={(option) => `${option.listing.ticker} (${option.listing.crypto})`}
        renderOption={(props, option) => (
          <Stack {...props} direction="row" spacing={1} alignItems='center' sx={{
            backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
          }}>
            <img src={option.listing.additionalI} alt="ico" width="24" height="24" />
            <Typography variant='body1' sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>{option.listing.ticker}</Typography>
            <Typography variant='subtitle2' sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>{option.listing.crypto}</Typography>
          </Stack>
        )}
        value={selectedItem}
        onChange={(evt, val) => {
          handleChange(evt, val, val?.listing?.id);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={values?.coin}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Select the coin"
            error={Boolean(touched?.coin && errors?.coin)}
            sx={{
              '& .MuiInputBase-input': {
                height: '12px',
                borderRadius: '5px',
                borderColor: touched?.coin && errors?.coin ? 'red' : '#959595',
              }
            }}
          // helperText={!touched?.coin && values?.coin == null ? 'Please select the coin' : ''}
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