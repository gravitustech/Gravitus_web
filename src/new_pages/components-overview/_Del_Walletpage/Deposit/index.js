import React from 'react';
import { Grid, Typography, Stack, Card, useTheme, Box, IconButton } from '@mui/material';
import { useNavigate} from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Lodergif from 'src/components/Gravitusloader';
import Deposithead1 from './DepositeHeads/Depositehead1/index';
import Depositehead2 from './DepositeHeads/Depositehead2/index';
import DepositeTable from './DepositeTable/index';
import { fetcher, getWalletURL } from '../../../../api/wallet';
import useSWR from 'swr';
import { useState } from 'react';

const DepositPage = () => {
  const [depositData, setDepositData] = useState();
  const [historyData, setHistoryData] = useState();
  // console.log({ historyData });
  const { data, error, isLoading } = useSWR(
    getWalletURL(),
    (url) => fetcher(url)
    // { suspense: true }
  );

  // const { data, error, isLoading } = useSWR(
  //   getWalletURLDeposit(),
  //   (url) => fetcher(url, { accountType: 'GRAVITUS', postData: { walletId: 1 } })
  //   // { suspense: true }
  // );

  console.log('res', data, error, isLoading);
  const theme = useTheme();

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
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
      {data ? (
        <>
          <Grid container pl={15} pr={15} pb={5}>
            <Grid container>
              <Grid pl={5} xs={12} sm={12} md={6} lg={6}>
                {data && (
                  <Deposithead1
                    walletList={data.result.walletList.filter((item) => item.listing.id !== 17)}
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
                {data && <DepositeTable historyData={historyData} />}
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

export default DepositPage;
