import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { TextField, Typography, useTheme } from '@mui/material';
import useSWR from 'swr';
import { fetcher, getDepositData, getWalletDataById } from '../../../../../../api/wallet';
import { useState } from 'react';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

function CoinSelectTextfield({ walletList, setDepositData, setHistoryData }) {
  const theme = useTheme();
  const location = useLocation();
  const { walletId } = location.state ? location.state : { walletId: null };
  console.log(walletId, walletList);
  const [selectedItem, setSelectedItem] = useState(walletId && walletList.find((item) => item.listing.id === walletId));
  const handleChange = async (e, val, id) => {
    // console.log('qw', val, id);
    setSelectedItem(val);
    if (id) {
      try {
        const { data: data1 } = await getDepositData({ accountType: 'GRAVITUS', postData: { walletId: id } });
        const { data: data2 } = await getWalletDataById({ accountType: 'GRAVITUS', postData: { walletId: id } });
        // console.log('why', data2.result.internal);
        setDepositData(data1.result);
        setHistoryData(data2.result.external.filter((item) => item.transType === 'Deposit'));
      } catch (e) {
        console.log(e.message);
      }
    } else {
      setHistoryData(null);
      setDepositData(null);
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
        // disableCloseOnSelect
        getOptionLabel={(option) => `${option.listing.ticker} (${option.listing.crypto})`}
        renderOption={(props, option) => (
          <Stack {...props} direction="row" spacing={1} alignItems="center">
            <img src={option.listing.additionalI} alt="ico" width="24" height="24" />
            <Typography variant="body1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
              {option.listing.ticker}
            </Typography>
            <Typography variant="subtitle2" sx={{ color: theme.palette.mode === 'dark' ? 'text.primarydark' : 'text.primary' }}>
              {option.listing.crypto}
            </Typography>
          </Stack>
        )}
        value={selectedItem}
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
