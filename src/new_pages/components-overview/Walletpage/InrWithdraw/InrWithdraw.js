import CustomSnackBar from '../../../../components/snackbar';
import { Box, Card, Divider, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';

import useSWR from 'swr';
import React, { useState } from 'react';
import { Pre_Rs_Withdraw, fetcherWallet } from 'src/api_ng/wallet_ng';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InrWithdraw_sp from './InrWithdraw_Sp';
import Lodergif from 'src/components/Gravitusloader';
import InrWithdrawDisclaimer from './Disclaimer';
import InrWithdrawTable from './InrWithdraw_table';
import InrWithdrawTable_Mbl from './InrWithdraw_table_mbl';

const InrWithdraw = () => {
  const theme = useTheme();
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [formikValues, setFormikValues] = useState({});

  function useINR_Prewithdraw() {
    var postData = { walletId: 17 };

    const { data, error, isLoading } = useSWR([Pre_Rs_Withdraw(), postData], fetcherWallet, {
      revalidateIfStale: true, revalidateOnFocus: false, revalidateOnMount: true, revalidateOnReconnect: true
    });

    return { data, error, isLoading };
  }

  const {
    data: withdrawINRRc,
    error: withdrawINREr,
    isLoading: iswithdrawINRRcLoading
  } = useINR_Prewithdraw();

  if (withdrawINREr) {
    // Call Logout User
  }
  const goBack = () => {
    navigate(-1);
  }
  // console.log('withdrawINRRc', withdrawINRRc)
  return (
    <>
      <Grid container
        display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}
        pt={{ md: 3, lg: 3 }}
        pb={{ md: 3, lg: 3 }}
        pl={{ md: 14, lg: 14 }}
        pr={{ md: 6, lg: 15 }}
      >
        <Stack direction="row" spacing={0.8} alignItems="center">
          <IconButton onClick={goBack} disableRipple>
            <ArrowBackIosNewIcon
              pt={10}
              sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
            />
          </IconButton>
          <Typography variant="h1" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
            INR Withdraw
          </Typography>
        </Stack>
      </Grid>
      {withdrawINRRc ? (
        <>
          <Grid
            container
            pt={{ xs: 0, sm: 0, md: 3, lg: 3 }}
            pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
            pl={{ xs: 0, sm: 0, md: 6, lg: 15 }}
            pr={{ xs: 2, sm: 2, md: 6, lg: 15 }}
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground',
              borderRadius: { xs: '0', sm: '0', md: '78px 78px 0 0', lg: '78px 78px 0 0' },
              boxShadow: '0px 5.133836269378662px 35.31077575683594px 0px rgba(0, 0, 0, 0.01), 0px 41px 282px 0px rgba(0, 0, 0, 0.02)'
            }} >

            <Grid container>
              <Grid
                display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
              >
                <Stack direction="row" spacing={1} pl={0.5} alignItems='center'  >
                  <Stack justifyContent='start'>
                    <IconButton onClick={goBack} disableRipple>
                      <ArrowBackIcon
                        sx={{ cursor: 'pointer', color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}
                      />
                    </IconButton>
                  </Stack>
                  <Stack justifyContent='start'>
                    <Typography variant="h4" sx={{ color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary' }}>
                      INR Withdraw
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Grid item pl={{ xs: 2, sm: 2, md: 5, lg: 5 }}
              xs={12} sm={12} md={6} lg={5}>
              <InrWithdraw_sp
                inrWithdrawData={withdrawINRRc?.result}
                formikValues={formikValues}
                setFormikValues={setFormikValues}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarOpen={setSnackbarOpen}
                setStep={setStep}
                step={step}
              />
            </Grid>
            <Grid item lg={1}>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} pt={1.5}
              display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
              <InrWithdrawDisclaimer />
            </Grid>
          </Grid>

          <Card
            sx={{
              border: 'none',
              width: '100%',
              boxShadow: 'none',
            }}
          >
            <Box
              pt={{ xs: 2, sm: 2, md: 3, lg: 3 }}
              pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
              pl={{ xs: 2, sm: 2, md: 6, lg: 15 }}
              pr={{ xs: 2, sm: 2, md: 6, lg: 15 }}
              lg={12}
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? 'text.cardbackgrounddark' : 'text.cardbackground'
              }}
            >
              <Stack pb={{ xs: 2, sm: 2, md: 3, lg: 3 }}
                pl={{ xs: 0, sm: 0, md: 5, lg: 5 }}>
                <Divider></Divider>
              </Stack>
              <Typography
                pl={{ xs: 0, sm: 0, md: 5, lg: 5 }}
                variant="h4"
                sx={{
                  color: theme.palette.mode === 'dark' ? 'text.secondarydark' : 'text.secondary'
                }}
              >
                Withdraw History
              </Typography>
              <Stack pl={{ xs: 0, sm: 0, md: 3.6, lg: 3.6 }}
                pt={1}>
                <>
                  <Stack display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                    <InrWithdrawTable historyData={withdrawINRRc?.result?.external} />
                  </Stack>

                  <Stack display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none' }}
                    pt={2}
                    sx={{
                      width: '100%',
                      maxWidth: '100%',
                      '& td, & th': { whiteSpace: 'nowrap' },
                      overflowY: 'scroll',
                      /* Custom scrollbar styles */
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'gray lightgray',
                      height: '462px',
                      '&::-webkit-scrollbar': {
                        width: '0px', // Width of the scrollbar
                      },
                      '&::-webkit-scrollbar-track': {
                        background: theme.palette.mode === "dark" ? 'transparent' : "transparent", // Track color
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: theme.palette.mode === "dark" ? '#262B39' : "lightgray",
                        borderRadius: '8px', // Round the corners of the thumb
                      },
                    }}
                  >
                    <InrWithdrawTable_Mbl historyData={withdrawINRRc?.result?.external} />
                  </Stack>
                </>
              </Stack>
            </Box>
          </Card>
        </>
      ) : (
        <Lodergif />
      )}
      <CustomSnackBar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        snackbarMessage={snackbarMessage && snackbarMessage.msg}
        success={snackbarMessage && snackbarMessage.success}
      />
    </>
  );
};

export default InrWithdraw;