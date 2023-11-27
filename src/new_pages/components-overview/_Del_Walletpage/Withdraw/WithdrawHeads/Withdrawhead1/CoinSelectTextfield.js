import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { FormHelperText, TextField, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import { getWalletDataById } from '../../../../../../api/wallet';
import { values } from 'lodash';
import { useFormik } from 'formik';

function CoinSelectTextfield({ walletList, walletId, setWalletId, setHistoryData, setWalletData,
  error, // Pass the error prop
  touched, // Pass the touched prop
  errors, // Pass the errors prop
  handleBlur,
  coin,
  values,
  setFieldValue,
  formik
}) {
  const theme = useTheme();
  console.log(walletId, walletList);
  const [selectedItem, setSelectedItem] = useState(walletId && walletList.find((item) => item.listing.id === walletId));
  const handleChange = async (e, val, id,) => {
    console.log('qw', val, id);
    setSelectedItem(val);
    setWalletId(id);
    setFieldValue('coin', val);
    if (id) {
      try {
        const { data } = await getWalletDataById({ accountType: 'GRAVITUS', postData: { walletId: id } });
        console.log({ data });
        setWalletData(data.result);
        setHistoryData(data.result.external.filter((item) => item.transType === 'Withdraw'));
        // setFieldValue('coin', val);
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
    // console.log('in');
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
            value={values.coin}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Select the coin"
            error={Boolean(touched.coin && errors.coin)}
            sx={{
              '& .MuiInputBase-input': {
                height: '12px',
                borderRadius: '5px',
                borderColor: error && touched ? 'red' : '#959595',
              }
            }}
            helperText={error && touched ? errors : ''}
          />
        )}
      />
      {touched.coin && errors.coin && (
        <FormHelperText error id="standard-weight-helper-text-email-login">
          {errors.coin}
        </FormHelperText>
      )}
    </Stack>
  );
}
export default CoinSelectTextfield;
