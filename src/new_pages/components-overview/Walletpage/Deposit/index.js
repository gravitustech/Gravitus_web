
import { Grid, Typography, Stack, Card, useTheme, Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import Deposithead1 from './DepositeHeads/Depositehead1/index';
import Depositehead2 from './DepositeHeads/Depositehead2/index';
import DepositeTable from './DepositeTable/index';
import Lodergif from 'src/components/Gravitusloader';

import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate} from 'react-router-dom';
import { socket } from '../../../../socket';
import useSWR, { mutate } from 'swr';

import { Wallet_Fetch_Info, fetcherWallet } from 'src/api_ng/wallet_ng';
import { getConfig_sp, setConfig_ng } from '../../../../utils_ng/localStorage_ng';

const DepositPageNG = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [depositData, setDepositData] = useState();
  const [historyData, setHistoryData] = useState();
  var superData = null;

  const goBack = () => {
    navigate(-1);
  }

  function useWalletFetchInfo() {
    const { data, error, isLoading } = useSWR([Wallet_Fetch_Info(), {}], fetcherWallet, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const { 
    data: walletRc, 
    error: walletEr, 
    isLoading: isWALLETDataLoading 
  } = useWalletFetchInfo();

  if (walletEr) {
    // Call Logout User
  }
  else {
    superData = walletRc?.result;
  }

  return (
    <>
      <Grid container pl={14} pr={15} pt={3} pb={5}>
        <Stack direction="row" spacing={0.8} alignItems="center">
          <IconButton onClick={goBack} disableRipple>
            <ArrowBackIosNewIcon
              pt={10}
              sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            />
          </IconButton>
          <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            Deposit Crypto
          </Typography>
        </Stack>
      </Grid>

      {superData ? (
        <>
          <Grid container pl={15} pr={15} pb={5}>
            <Grid container>
              <Grid pl={5} xs={12} sm={12} md={6} lg={6}>
                {superData && (
                  <Deposithead1
                    walletList={superData?.walletList.filter((item) => item.listing.id !== 17)}
                    setDepositData={setDepositData}
                    depositData={depositData}
                    setHistoryData={setHistoryData}
                  />
                )}
              </Grid>
              <Grid xs={12} md={6} lg={6} display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                <Depositehead2 />
              </Grid>
            </Grid>
          </Grid>

          <Card
            sx={{
              border: 'none',
              width: '100%',
              borderRadius: '78px 78px 0px 0px',
              boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
            }}
          >
            <Box
              pt={3}
              pb={3}
              pl={15}
              pr={15}
              lg={12}
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
              }}
            >
              <Typography
                pl={5}
                variant="h4"
                sx={{
                  color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                }}
              >
                Deposit History
              </Typography>
              <Stack pl={3.6} pt={1}>
                {superData && <DepositeTable historyData={historyData} />}
              </Stack>
            </Box>
          </Card>
        </>
      ) : (
        <Lodergif />
      )}
    </>
  );
};

export default DepositPageNG;