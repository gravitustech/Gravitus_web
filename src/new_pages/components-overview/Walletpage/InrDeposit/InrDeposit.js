import React, { useState, useEffect } from 'react';

import InrDeposit_Step1_sp from './InrDeposit_Step1_sp';
import InrDeposit_Step2_sp from './InrDeposit_Step2_sp';
import InrDeposit_Step3_sp from './InrDeposit_Step3_sp';
import InrDepositTable from './InrDeposit_table';
import InrDeposit_table_Mbl from './InrDeposit_table_Mbl';
// import InrDeposit_STEP1 from './InrDeposit_STEP1';
// import InrDeposit_STEP2 from './InrDeposit_STEP2';
// import InrDeposit_STEP3 from './InrDeposit_STEP3';
import CustomSnackBar from 'src/components/snackbar';

import useSWR from 'swr';
import { Pre_Rs_Deposit, fetcherWallet } from 'src/api_ng/wallet_ng';
import { Box, Card, Divider, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';
import Lodergif from 'src/components/Gravitusloader';


const InrDeposit = () => {
  const theme = useTheme();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);
  const [formikValues, setFormikValues] = useState({ term1: false, term2: false, term3: false, term4: false });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  useEffect(() => {
    handleOpen();
  }, [])

  // console.log('walletINRRc', walletINRRc);
  return (
    <>
      {walletINRRc ? (
        <>
          {step === 1 && walletINRRc && (
            <InrDeposit_Step1_sp
              depositFrom={walletINRRc.result.depositFrom}
              depositTo={walletINRRc.result.depositTo}
              setStep={setStep}
              setFormikValues={setFormikValues}
              formikValues={formikValues}
              handleOpen={handleOpen}
              handleClose={handleClose}
              open={open}
            />
          )}
          {step === 2 && walletINRRc && (
            <InrDeposit_Step2_sp
              depositFrom={walletINRRc.result.depositFrom}
              depositTo={walletINRRc.result.depositTo}
              setStep={setStep}
              setFormikValues={setFormikValues}
              formikValues={formikValues}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
            />
          )}
          {step === 3 && walletINRRc && (
            <InrDeposit_Step3_sp
              depositFrom={walletINRRc.result.depositFrom}
              depositTo={walletINRRc.result.depositTo}
              setStep={setStep}
              setFormikValues={setFormikValues}
              formikValues={formikValues}
              setSnackbarOpen={setSnackbarOpen}
              setSnackbarMessage={setSnackbarMessage}
              walletId={17}
            />
          )}

          <Card
            sx={{
              border: 'none',
              width: '100%',
              boxShadow: 'none'
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
                Deposit History
              </Typography>
              <Stack pl={{ xs: 0, sm: 0, md: 3.6, lg: 3.6 }}
                pt={1}>
                <>
                  <Stack display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block' }}>
                    <InrDepositTable historyData={walletINRRc?.result?.external} />
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
                    <InrDeposit_table_Mbl historyData={walletINRRc?.result?.external} />
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

export default InrDeposit;
